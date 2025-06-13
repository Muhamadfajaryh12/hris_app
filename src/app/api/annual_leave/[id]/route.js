import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.annualLeave.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        hrd: true,
        leader: true,
        user: {
          include: {
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
    const { searchParams } = await new URL(req.url);
    const leaderId = searchParams.get("leaderId");
    const hrdId = searchParams.get("hrdId");
    const body = await req.json();
    const { approval_hrd, approval_leader } = body;

    let query;

    if (leaderId) {
      query = prisma.annualLeave.update({
        where: {
          id: Number(id),
        },
        data: {
          leaderId: Number(leaderId),
          approval_leader: approval_leader,
        },
        include: {
          leader: true,
        },
      });
    }

    if (hrdId) {
      query = prisma.annualLeave.update({
        where: {
          id: Number(id),
        },
        data: {
          hrdId: Number(hrdId),
          approval_hrd: approval_hrd,
        },
        include: {
          hrd: true,
        },
      });
    }

    const result = await query;

    return NextResponse.json({
      data: result,
      message: "berhasil",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
