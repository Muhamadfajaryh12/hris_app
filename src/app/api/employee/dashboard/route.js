import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const countEmployeeBySection = await prisma.$queryRaw`
    SELECT 
    "Section"."section" as section_name,
    COALESCE(COUNT("User".id),0)::integer as count_employee
    FROM "Section"
    LEFT JOIN "User" ON "User"."sectionId" = "Section"."id"
    GROUP BY "Section"."section"
    ORDER BY count_employee DESC
    `;

    const countCostBySection = await prisma.$queryRaw`
    SELECT 
    "Section".section as section_name,
   COALESCE(SUM("Salary".total_salary),0)::integer as cost_section
    FROM "Section"
    LEFT JOIN "User" ON "User"."sectionId" = "Section"."id"
    LEFT JOIN "Salary" ON "Salary"."employeeId" = "User"."id"
    GROUP BY "Section".section
    ORDER BY cost_section DESC
    `;

    const countWorkTimeAndOvertimeBySection = await prisma.$queryRaw`
    SELECT
        "Section".section as section_name,
        COALESCE(attendence_sum.total_time_working, 0) as total_time_working,
        COALESCE(overtime_sum.total_overtime, 0) as total_overtime
    FROM "Section"
    LEFT JOIN (
        SELECT 
            "User"."sectionId",
            SUM("Attendence".time_working)::integer as total_time_working
        FROM "User"
        JOIN "Attendence" ON "Attendence"."userId" = "User".id
        GROUP BY "User"."sectionId"
    ) attendence_sum ON attendence_sum."sectionId" = "Section".id
    LEFT JOIN (
        SELECT 
            "User"."sectionId",
            SUM("Overtime".overtime_duration)::integer as total_overtime
        FROM "User"
        JOIN "Overtime" ON "Overtime"."userId" = "User".id
        GROUP BY "User"."sectionId"
    ) overtime_sum ON overtime_sum."sectionId" = "Section".id
    ORDER BY total_time_working DESC
    `;

    const countTrainingBySection = await prisma.$queryRaw`
    SELECT 
    "Section".section as section_name,
    COALESCE(count_total_training.total_training,0) as total
    FROM "Section"
    LEFT JOIN (
      SELECT
        "User"."sectionId",
        COUNT("Training".id)::integer as total_training
      FROM "User"
      JOIN "Training" ON "Training"."userId" = "User"."id"
      GROUP BY "User"."sectionId"
    ) count_total_training on count_total_training."sectionId" = "Section"."id"
        ORDER BY total DESC
    `;

    const countContractTypeBySection = await prisma.$queryRaw`
    SELECT
      s.section as section_name,
      COUNT(c.id) FILTER (WHERE c.contract_type = 'Permanent')::integer as total_permanent,
      COUNT(c.id) FILTER (WHERE c.contract_type = 'Contract')::integer as total_contract,
      COUNT(c.id) FILTER (WHERE c.contract_type = 'Internship')::integer as total_internship,
      COALESCE(COUNT(c.id),0)::integer as total_count
      FROM "Section" s
      LEFT JOIN "User" u ON u."sectionId" = s.id
      LEFT JOIN "Contract" c ON c."employeeId" = u.id
      GROUP BY s.section
      ORDER BY total_count DESC
    `;

    const countGenderBySection = await prisma.$queryRaw`
    SELECT "Section".section,
    COALESCE(COUNT(CASE WHEN "User".gender = 'Laki-Laki' then 1 else 0 end ),0)::integer as laki_total_count,
    COALESCE(COUNT(CASE WHEN "User".gender = 'Perempuan' then 1 else 0 end),0)::integer as perempuan_total_count,
    COALESCE(COUNT("User".id), 0)::integer as total_count
    FROM "Section"
    LEFT JOIN "User" ON "User"."sectionId" = "Section".id
    GROUP BY "Section".section
    ORDER BY total_count DESC
    `;
    return NextResponse.json({
      data: {
        countCostBySection,
        countEmployeeBySection,
        countWorkTimeAndOvertimeBySection,
        countTrainingBySection,
        countContractTypeBySection,
        countGenderBySection,
      },
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
