import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const levels = await prisma.level.findUnique({ where: { id: Number(id) } });
    return NextResponse.json({ data: levels }, { status: StatusCodes.OK });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;
    const { level } = body;
    const result = await prisma.level.update({
      where: { id: Number(id) },
      data: {
        level: level,
      },
    });
    return NextResponse.json(
      { message: "Berhasil update" },
      { data: result },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.level.delete({ where: { id: Number(id) } });
    return NextResponse.json(
      { message: "Berhasil menghapus" },
      { data: result },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return ErrorResponse(error);
  }
}
