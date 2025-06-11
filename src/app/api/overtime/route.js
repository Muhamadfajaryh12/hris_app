import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { TimeToMnt } from "@/lib/TimeToMnt";
import { UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = await new URL(req.url);
    const id = searchParams.get("id");

    let query;
    if (id) {
      query = prisma.overtime.findUnique({
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
    } else {
      query = prisma.overtime.findMany({
        select: {
          id: true,
          date: true,
          approval_leader: true,
          compensation: true,
          overtime_duration: true,
          break_duration: true,
          work_note: true,
          shift: {
            select: {
              title: true,
            },
          },
          user: {
            select: {
              name: true,
              npk: true,
            },
          },
        },
      });
    }
    const result = await query;
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
    const formData = await req.formData();
    const date = formData.get("date");
    const shiftId = formData.get("shiftId");
    const compensation = formData.get("compensation");
    const overtime_duration = formData.get("overtime_duration");
    const break_duration = formData.get("break_duration");
    const work_note = formData.get("work_note");
    const file = formData.get("file");
    const fileName = await UploadFile(file);

    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    const result = await prisma.overtime.create({
      data: {
        date: new Date(date),
        shiftId: Number(shiftId),
        compensation: compensation,
        overtime_duration: TimeToMnt(overtime_duration),
        break_duration: TimeToMnt(break_duration) || 0,
        work_note: work_note,
        file: fileName,
        userId: Number(userId),
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
