import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { UploadFile } from "@/lib/UploadFile";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const result = await prisma.contract.findMany({
      include: {
        employee: {
          select: {
            npk: true,
            name: true,
            position: {
              select: {
                position: true,
              },
            },
          },
        },
      },
      orderBy: {
        end_date: "asc",
      },
    });

    const countContract = await prisma.$queryRaw`
    SELECT 
    contract_type,
    COALESCE(COUNT(contract_type),0) as total
    FROM "Contract"
    GROUP BY contract_type
    `;
    return NextResponse.json({
      data: {
        result,
        countContract,
      },
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const contract_type = formData.get("contract_type");
    const status = formData.get("status");
    const file_contract = formData.get("file_contract");
    const employeeId = formData.get("employeeId");

    const fileName = await UploadFile(file_contract);

    const result = await prisma.contract.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        contract_type: contract_type,
        status: status,
        file_contract: fileName,
        employeeId: Number(employeeId),
      },
    });

    return NextResponse.json({
      data: result,
      status: StatusCodes.CREATED,
      message: "Successfully created",
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
