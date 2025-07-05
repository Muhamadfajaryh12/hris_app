import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { TimeToMnt } from "@/lib/TimeToMnt";
import { DeleteFile, UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const result = await prisma.overtime.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        date: true,
        approval_leader: true,
        compensation: true,
        overtime_duration: true,
        break_duration: true,
        work_note: true,
        file: true,
        approval_leader: true,
        leaderId: true,
        shiftId: true,
        leader: {
          select: {
            name: true,
          },
        },
        shift: {
          select: {
            title: true,
            work_time: true,
          },
        },
        user: {
          select: {
            name: true,
            npk: true,
            level: {
              select: {
                level: true,
              },
            },
            section: {
              select: {
                section: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json({
      status: StatusCodes.OK,
      data: result,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const allowFields = [
      "date",
      "shiftId",
      "compensation",
      "ovetime_duration",
      "break_duration",
      "work_note",
      "approval_leader",
      "leaderId",
    ];
    const updateData = {};
    const file = formData.get("file");

    allowFields.forEach((key) => {
      const value = formData.get(key);
      if (value !== null && value !== undefined) {
        if (key.endsWith("Id") && value !== null) {
          updateData[key] = Number(value);
        } else if (key.endsWith("duration") && value !== null) {
          updateData[key] = TimeToMnt(value);
        } else if (key == "date" && value !== null) {
          updateData[key] = new Date(value);
        } else {
          updateData[key] = value;
        }
      }
    });

    const checkOvertime = await prisma.overtime.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (file) {
      await DeleteFile(checkOvertime.file);
      const fileName = await UploadFile(file);
      updateData.file = fileName;
    }

    const result = await prisma.overtime.update({
      where: {
        id: Number(id),
      },
      data: updateData,
      select: {
        approval_leader: true,
        leaderId: true,
        leader: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Successfully updated",
      status: StatusCodes.OK,
      data: result,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const checkOvertime = await prisma.overtime.findUnique({
      where: {
        id: Number(id),
      },
    });

    await DeleteFile(checkOvertime.file);

    const result = await prisma.overtime.delete({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({
      data: result,
      status: StatusCodes.OK,
      message: "Deleted successfully",
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
