import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.salary.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        employee: {
          include: {
            position: true,
          },
        },
      },
    });
    return NextResponse.json({
      data: result,
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(Error);
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      basic_salary,
      increase_salary,
      total_salary,
      start_date,
      end_date,
      employeeId,
    } = body;

    const result = await prisma.salary.update({
      where: {
        id: Number(id),
      },
      data: {
        basic_salary: Number(basic_salary),
        increase_salary: Number(increase_salary),
        total_salary: Number(total_salary),
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        employeeId: Number(employeeId),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Successfully",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
