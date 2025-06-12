import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        npk: true,
        email: true,
        gender: true,
        no_telp: true,
        levelId: true,
        level: {
          select: {
            level: true,
          },
        },
        sectionId: true,
        section: {
          select: {
            section: true,
          },
        },
        positionId: true,
        position: {
          select: {
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
    const {
      npk,
      email,
      name,
      gender,
      no_telp,
      levelId,
      sectionId,
      positionId,
    } = body;
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        npk: parseInt(npk),
        email: email,
        name: name,
        gender: gender,
        no_telp: no_telp,
        levelId: parseInt(levelId),
        sectionId: parseInt(sectionId),
        positionId: parseInt(positionId),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Berhasil mengubah data",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
