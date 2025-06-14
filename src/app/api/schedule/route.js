import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const result = await prisma.schedule_Event.findMany();
    const formattedResults = result.map((data) => ({
      ...data,
      date: new Date(data.date).toISOString().split("T")[0], // Fixed date formatting
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
    } = body;
    const result = await prisma.schedule_Event.create({
      data: {
        title: title,
        date: date,
        hours_start: hours_start,
        hours_end: hours_end,
        description: description,
        category: category,
        levelId: Number(levelId),
        sectionId: Number(sectionId),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Berhasil",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
