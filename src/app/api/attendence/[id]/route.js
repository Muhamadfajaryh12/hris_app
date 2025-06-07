import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;
    const { time_out } = body;

    const result = await prisma.attendence.update({
      where: {
        id: Number(id),
      },
      data: {
        time_out: time_out,
      },
    });

    return NextResponse.json({
      data: result,
      message: "Berhasil Clock-out",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
