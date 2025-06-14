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
      include: {
        user: {
          select: {
            npk: true,
            name: true,
            position: {
              select: {
                position: true,
              },
            },
          },
        },
      },
    });

    const countByStatus = await prisma.annualLeave.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });
    const countByStatusDTO = [
      { status: "Waiting", count: 0 },
      { status: "Approved", count: 0 },
      { status: "Rejected", count: 0 },
    ].map((defaultItem) => {
      const foundItem = countByStatus.find(
        (dbItem) => dbItem.status === defaultItem.status
      );
      return foundItem
        ? { ...defaultItem, count: foundItem._count.status }
        : defaultItem;
    });
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

export async function POST(req) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    const { date_start, date_end, data_count, reason, type } = body;

    const result = await prisma.annualLeave.create({
      data: {
        status: "Waiting",
        reason: reason,
        date_start: date_start,
        date_end: date_end,
        type: type,
        approval_hrd: "Waiting",
        approval_leader: "Waiting",
        data_count: Number(data_count),
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
