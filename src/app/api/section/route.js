import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await prisma.section.findMany();
    return NextResponse.json({ data: result }, { status: StatusCodes.OK });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { section } = body;
    const result = await prisma.section.create({
      data: { section: section },
    });
    return NextResponse.json({
      data: result,
      message: "Sucessfully created",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
