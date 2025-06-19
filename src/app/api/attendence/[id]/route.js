import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;
    const { time_out, emotion } = body;

    const detailAttendence = await prisma.attendence.findUnique({
      where: {
        id: Number(id),
      },
    });

    const timeIn = new Date(detailAttendence.time_in);
    const timeOut = new Date(time_out);
    const timeWorkingMs = timeOut - timeIn;
    const timeWorkingMinutes = Math.floor(timeWorkingMs / 60000);
    const timeWorkingHour = Math.floor(timeWorkingMinutes / 60);

    const result = await prisma.attendence.update({
      where: {
        id: Number(id),
      },
      data: {
        time_out: time_out,
        time_working: timeWorkingHour,
        emotion: emotion,
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
