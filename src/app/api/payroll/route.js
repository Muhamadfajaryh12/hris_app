import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(req, res) {
  try {
    const result = await prisma.payroll.findMany({
      include: {
        employee: true,
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
    const {
      period_month,
      period_year,
      bonus,
      bonus_overtime,
      deduction_bpjs,
      deduction_pph,
      deduction_attendence,
      total_salary,
      employeeId,
    } = body;
    console.log(body);
    const result = await prisma.payroll.create({
      data: {
        employeeId: Number(employeeId),
        period_month: Number(period_month),
        period_year: Number(period_year),
        bonus: Number(bonus) || 0,
        bonus_overtime: Number(bonus_overtime) || 0,
        deduction_bpjs: Number(deduction_bpjs) || 0,
        deduction_pph: Number(deduction_pph) || 0,
        deduction_attendence: Number(deduction_attendence) || 0,
        total_salary: Number(total_salary),
        status: "Waiting",
      },
    });
    return NextResponse.json({
      data: result,
      status: StatusCodes.CREATED,
      message: "Successfully",
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
