import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const date = formData.get("date");
    const shift = formData.get("shift");
    const compensation = formData.get("compensation");
    const overtime_duration = formData.get("overtime_duration");
    const break_duration = formData.get("break_duration");
    const work_note = formData.get("work_note");
    const file = formData.get("file");

    const fileName = await UploadFile(file);

    const result = await prisma.overtime.create({
      data: {
        date: date,
        shift: shift,
        compensation: compensation,
        overtime_duration: Number(overtime_duration),
        break_duration: Number(break_duration) || 0,
        work_note: work_note,
        file: fileName,
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
