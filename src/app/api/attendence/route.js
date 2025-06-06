import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.attendence.findMany({
      where: {
        userId: Number(id),
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
    const { time_in, userId } = body;

    const timeDate = new Date(time_in);

    const setTime = new Date(timeDate);
    setTime.setHours(8, 0, 0, 0);

    const status = timeDate > setTime ? "Late" : "On-Time";

    const result = await prisma.attendence.create({
      data: {
        time_in: time_in,
        userId: userId,
        status: status,
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
