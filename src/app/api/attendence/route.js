import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const params = await req.params;
    const { id } = params;
    const result = await prisma.attendence.findMany({
      where: {
        userId: id,
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

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { time_in, status, userId } = body;
    const result = prisma.attendence.create({
      data: {
        time_in,
        userId,
        status,
      },
    });

    return NextResponse.json({
      data: result,
      message: "Berhasil absen",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
