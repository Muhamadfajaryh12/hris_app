import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const result = await prisma.shift.findMany();

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
    const { title, work_time } = body;
    const result = await prisma.shift.create({
      data: {
        title: title,
        work_time: work_time,
      },
    });

    return NextResponse.json({
      data: result,
      message: "Successfuly",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
