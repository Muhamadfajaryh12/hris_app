import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { DeleteFile, UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.training.findUnique({
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
    const formData = await req.formData();
    const title = await formData.get("title");
    const training_type = await formData.get("training_type");
    const training_category = await formData.get("training_category");
    const cost = await formData.get("cost");
    const training_date = await formData.get("training_date");
    const file = formData.get("file");
    const userId = await formData.get("userId");

    let fileName;

    const checkTraining = await prisma.training.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (file && file.size > 0) {
      if (checkTraining.file) {
        await DeleteFile(checkTraining.file);
      }
      fileName = await UploadFile(file);
    } else {
      fileName = checkTraining.file;
    }

    const result = await prisma.training.update({
      where: {
        id: Number(id),
      },
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
      message: "Sucessfully updated",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const checkTraining = await prisma.training.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkTraining.file) {
      await DeleteFile(checkTraining.file);
    }

    const result = await prisma.training.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Successfully deleted",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
