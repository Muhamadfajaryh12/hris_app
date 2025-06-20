import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.schedule_Event.findUnique({
      where: {
        id: Number(id),
      },
    });
    const formattedResults = {
      ...result,
      date_start: new Date(result.date).toISOString().split("T")[0],
      date_end: new Date(result?.date_end).toISOString().split("T")[0],
    };

    return NextResponse.json({
      data: formattedResults,
      message: "Detail",
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

    const result = await prisma.schedule_Event.update({
      where: {
        id: Number(id),
      },
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
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.schedule_Event.delete({
      where: {
        id: Number(id),
      },
    });

    const formattedResults = {
      ...result,
      date_start: new Date(result.date).toISOString().split("T")[0],
      date_end: new Date(result.date_end).toISOString().split("T")[0],
    };

    return NextResponse.json({
      data: formattedResults,
      message: "Successfully delete schedule",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
