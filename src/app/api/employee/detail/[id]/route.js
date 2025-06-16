import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const employe = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        npk: true,
        name: true,
        level: {
          select: {
            level: true,
          },
        },
        position: {
          select: {
            position: true,
          },
        },
        section: {
          select: {
            section: true,
          },
        },
        salary: {
          select: {
            total_salary: true,
          },
        },
      },
    });

    const countOvertime = await prisma.overtime.aggregate({
      where: {
        userId: Number(id),
      },
      _sum: {
        overtime_duration: true,
      },
    });

    const countLeave = await prisma.annualLeave.aggregate({
      where: {
        userId: Number(id),
        status: "Approved",
      },
      _count: {
        status: true,
      },
    });

    const dataDTO = {
      id: employe.id,
      name: employe.name,
      npk: employe.npk,
      level: employe.level.level,
      position: employe.position.position,
      section: employe.section.section,
      salary: employe.salary.total_salary,
      count_overtime_duration: countOvertime._sum.overtime_duration || 0,
      count_leave: countLeave._count.status || 0,
    };

    return NextResponse.json({
      data: dataDTO,
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
