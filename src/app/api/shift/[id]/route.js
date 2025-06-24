import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.shift.findUnique({
      where: {
        id: Number(id),
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
    const { title, work_time } = body;

    const result = await prisma.shift.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        work_time: work_time,
      },
    });

    return NextResponse.json({
      data: result,
      message: "Successfuly",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const result = await prisma.shift.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({
      data: result,
      status: StatusCodes.OK,
      message: "Successfully",
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
