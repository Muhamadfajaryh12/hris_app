import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.payroll.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        employee: {
          select: {
            name: true,
            npk: true,
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
            level: {
              select: {
                level: true,
              },
            },
            salary: {
              select: {
                total_salary: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      data: result,
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, bonus, total_salary } = body;

    let query;
    if (status) {
      query = prisma.payroll.update({
        where: {
          id: Number(id),
        },
        include: {
          employee: {
            select: {
              name: true,
              npk: true,
            },
          },
        },
        data: {
          status: status,
        },
      });
    }

    if (bonus || total_salary) {
      query = prisma.payroll.update({
        where: {
          id: Number(id),
        },
        include: {
          employee: {
            select: {
              name: true,
              npk: true,
            },
          },
        },
        data: {
          bonus: Number(bonus),
          total_salary: Number(total_salary),
        },
      });
    }

    const result = await query;

    return NextResponse.json({
      data: result,
      message: "Successfully",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.payroll.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({
      data: result,
      status: StatusCodes.OK,
      message: "Successfully deleted",
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
