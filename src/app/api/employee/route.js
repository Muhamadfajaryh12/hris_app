import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(req) {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        npk: true,
        email: true,
        gender: true,
        no_telp: true,
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
    });
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
    const body = await req.json();
    const { npk, email, password, name, gender, no_telp, levelId, sectionId } =
      body;
    const hash = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        npk: parseInt(npk),
        email: email,
        password: hash,
        name: name,
        gender: gender,
        no_telp: no_telp,
        levelId: parseInt(levelId),
        sectionId: parseInt(sectionId),
      },
    });
    return NextResponse.json({
      data: result,
      message: "Berhasil data dibuat",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
