import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await prisma.position.findMany();
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
    const { position, base_salary } = body;
    const result = await prisma.position.create({
      data: {
        position: position,
        base_salary: Number(base_salary),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Successfully created",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
