import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = await new URL(req.url);
    const id = searchParams.get("id");
    const date = searchParams.get("date");

    let query;
    if (date) {
      query = prisma.$queryRaw`SELECT * from "Attendence"
      WHERE "userId" = ${Number(id)} AND DATE("created_at") = DATE(${date})
      `;
    } else {
      query = prisma.$queryRaw`SELECT * from "Attendence"
      WHERE "userId" = ${Number(id)}
      `;
    }

    const result = await query;
    const formattedResults = result.map((data) => ({
      ...data,
      created_at: new Date(data.created_at).toISOString().split("T")[0], // Fixed date formatting
    }));

    return NextResponse.json({
      data: formattedResults,
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
