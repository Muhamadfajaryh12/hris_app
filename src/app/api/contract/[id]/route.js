import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { DeleteFile, UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await prisma.contract.findUnique({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
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
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const contract_type = formData.get("contract_type");
    const status = formData.get("status");
    const file_contract = formData.get("file_contract");
    const employeeId = formData.get("employeeId");

    let fileName;

    const checkContract = await prisma.contract.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (file_contract && file_contract.size > 0) {
      await DeleteFile(checkContract.file_contract);
      fileName = await UploadFile(file_contract);
    }

    const result = await prisma.contract.update({
      where: {
        id: Number(id),
      },
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        contract_type: contract_type,
        status: status,
        employeeId: Number(employeeId),
        ...(file_contract && { file_contract: fileName }),
      },
    });

    return NextResponse.json({
      data: result,
      message: "Successfully",
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const checkContract = await prisma.contract.findUnique({
      where: {
        id: Number(id),
      },
    });

    await DeleteFile(checkContract.file_contract);

    const result = await prisma.contract.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      data: result,
      status: StatusCodes.OK,
      message: "Successfully deleted",
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
