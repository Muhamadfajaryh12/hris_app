import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = await new URL(req.url);
    const date = searchParams.get("date");
    let query;

    if (date) {
      query = prisma.$queryRaw`SELECT * from "Schedule_Event"
      WHERE DATE("date") = DATE(${date})`;
    } else {
      query = prisma.schedule_Event.findMany();
    }
    const result = await query;
    const formattedResults = result.map((data) => ({
      ...data,
      date_start: new Date(data.date).toISOString().split("T")[0],
      date_end: new Date(data.date_end).toISOString().split("T")[0],
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
    const {
      title,
      date,
      hours_start,
      hours_end,
      description,
      levelId,
      sectionId,
      category,
      date_end,
    } = body;
    const result = await prisma.schedule_Event.create({
      data: {
        title: title,
        date: date,
        date_end: date_end,
        hours_start: hours_start,
        hours_end: hours_end,
        description: description,
        category: category,
        levelId: Number(levelId),
        sectionId: Number(sectionId),
      },
    });

    const formattedResults = {
      ...result,
      date_start: new Date(result.date).toISOString().split("T")[0],
      date_end: new Date(result.date_end).toISOString().split("T")[0],
    };

    return NextResponse.json({
      data: formattedResults,
      message: "Berhasil",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
