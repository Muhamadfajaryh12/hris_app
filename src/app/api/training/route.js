import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
BigInt.prototype.toJSON = function () {
  return this.toString();
};
export async function GET(req, res) {
  try {
    const result = await prisma.training.findMany({
      include: {
        user: {
          select: {
            name: true,
            npk: true,
            position: true,
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
    const formData = await req.formData();
    const title = await formData.get("title");
    const training_type = await formData.get("training_type");
    const training_category = await formData.get("training_category");
    const cost = await formData.get("cost");
    const training_date = await formData.get("training_date");
    const file = formData.get("file");
    const userId = await formData.get("userId");

    const fileName = await UploadFile(file);

    const result = await prisma.training.create({
      data: {
        title: title,
        training_type: training_type,
        training_category: training_category,
        cost: Number(cost),
        training_date: new Date(training_date),
        file: fileName,
        userId: Number(userId),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Berhasil ",
      status: StatusCodes.CREATED,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
