import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = await new URL(req.url);
    const id = searchParams.get("id");

    const result = await prisma.annualLeave.findMany({
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

export async function POST(req) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    const { date_leave, reason } = body;

    const result = await prisma.annualLeave.create({
      data: {
        status: "Pending",
        reason: reason,
        date_leave: date_leave,
        userId: Number(userId),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Berhasil membuat",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
