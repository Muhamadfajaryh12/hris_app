import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { approval_leader, approval_leader_id } = body;

    const result = await prisma.overtime.update({
      where: {
        id: Number(id),
      },
      data: {
        approval_leader: approval_leader,
        approval_leader_id: approval_leader_id,
      },
    });

    return NextResponse.json({
      message: "Berhasil",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
