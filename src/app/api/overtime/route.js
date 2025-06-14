import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { TimeToMnt } from "@/lib/TimeToMnt";
import { UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
BigInt.prototype.toJSON = function () {
  return this.toString();
};

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
          leaderId: true,
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
    } else {
      query = prisma.overtime.findMany({
        omit: {
          work_note: true,
          file: true,
          compensation: true,
        },
        include: {
          user: {
            select: {
              name: true,
              npk: true,
              position: {
                select: {
                  position: true,
                },
              },
            },
          },
          shift: true,
        },
      });
    }

    const result = await query;
    const countByStatus = await prisma.overtime.groupBy({
      by: ["approval_leader"],
      _count: {
        approval_leader: true,
      },
    });
    const countByStatusDTO = countByStatus.map(
      ({ approval_leader, _count }) => ({
        approval_leader,
        count: _count.approval_leader,
      })
    );
    return NextResponse.json({
      data: {
        data: result,
        status_count: countByStatusDTO,
      },
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
        approval_leader: "Waiting",
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
