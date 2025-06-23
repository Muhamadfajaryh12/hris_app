import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.annualLeave.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        hrd: true,
        leader: true,
        user: {
          include: {
            position: true,
          },
        },
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

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const allowFields = [
      "status",
      "reason",
      "date_start",
      "date_end",
      "type",
      "approval_hrd",
      "approval_leader",
      "data_count",
      "leaderId",
      "hrdId",
    ];

    const updateData = Object.keys(body).reduce((acc, key) => {
      if (allowFields.includes(key)) {
        acc[key] = body[key];
        if (key.endsWith("Id") && body[key] !== null) {
          acc[key] = Number(body[key]);
        }
        if (key.toLowerCase() == "data_count" && body[key] !== null) {
          acc[key] = Number(body[key]);
        }
      }
      return acc;
    }, {});

    const result = await prisma.annualLeave.update({
      where: {
        id: Number(id),
      },
      data: updateData,
      include: {
        leader: true,
        hrd: true,
      },
    });

    return NextResponse.json({
      data: result,
      message: "berhasil",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
