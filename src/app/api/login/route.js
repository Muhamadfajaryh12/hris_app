import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const { npk, password } = body;
    console.log(password);
    const userValid = await prisma.user.findUnique({
      where: {
        npk: parseInt(npk),
      },
    });

    if (!userValid) {
      return NextResponse.json({
        status: StatusCodes.BAD_REQUEST,
        message: "NPK or Password doesn't macth",
      });
    }

    const passwordValid = await bcrypt.compare(password, userValid.password);
    if (!passwordValid) {
      return NextResponse.json({
        status: StatusCodes.BAD_REQUEST,
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
    const cookieStore = await cookies();

    if (token) {
      cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set({
        name: "user_id",
        value: userValid.id,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set({
        name: "section_id",
        value: userValid.sectionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

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
