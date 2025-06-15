import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.position.findUnique({
      where: {
        id: Number(id),
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
    const { position, base_salary } = body;

    const result = await prisma.position.update({
      where: {
        id: Number(id),
      },
      data: {
        position: position,
        base_salary: Number(base_salary),
      },
    });

    return NextResponse.json({
      data: result,
      status: StatusCodes.OK,
      message: "Berhasil",
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
