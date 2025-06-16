import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const result = await prisma.salary.findMany({
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

export async function POST(req, res) {
  try {
    const body = await req.json();
    const {
      basic_salary,
      increase_salary,
      total_salary,
      start_date,
      end_date,
      employeeId,
    } = body;
    const result = await prisma.salary.create({
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
      message: "berhasil",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
