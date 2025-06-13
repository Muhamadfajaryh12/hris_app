import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { approval_leader, leaderId } = body;

    const result = await prisma.overtime.update({
      where: {
        id: Number(id),
      },
      data: {
        approval_leader: approval_leader,
        leaderId: Number(leaderId),
      },
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
      message: "Berhasil",
      status: StatusCodes.OK,
      data: result,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
