import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const { npk, password } = body;
    const userValid = await prisma.user.findUnique({
      where: {
        npk: npk,
      },
    });

    const passwordValid = await bcrypt.compare(password, userValid.password);

    if (!userValid || !passwordValid) {
      return NextResponse.json({
        message: "NPK or Password doesn't macth",
      });
    }

    const token = jwt.sign(
      {
        npk: userValid.npk,
      },
      "123456",
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      data: {
        token: token,
        id: userValid.id,
      },
      message: "Berhasil Login",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
