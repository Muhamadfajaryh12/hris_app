import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
BigInt.prototype.toJSON = function () {
  return this.toString();
};
export async function GET(req, res) {
  try {
    const { searchParams } = await new URL(req.url);
    const date = searchParams.get("date");

    const count_attendence = await prisma.$queryRaw`
        SELECT
        COALESCE(SUM(case when status = 'On-Time' then 1 else 0 end),0) AS on_time,
        COALESCE(SUM(case when status = 'Late'  then 1 else 0 end),0) as late
        FROM "Attendence" WHERE DATE(created_at) = DATE(${date})
        `;

    const count_leave = await prisma.$queryRaw`
    SELECT
    COALESCE(SUM(case when status = 'Approved' then 1 else 0 end), 0) as leave
    FROM "AnnualLeave" WHERE DATE(date_start) = DATE(${date}) OR DATE(date_end) = DATE(${date})
    `;

    const count_employee = await prisma.$queryRaw`
    SELECT COUNT(*) as total_employee
    FROM "User"
    `;

    // const get_schedule = await prisma.schedule_Event.findMany({
    //   select: {
    //     id: true,
    //     title: true,
    //     date: true,
    //     date_end: true,
    //     hours_end: true,
    //     hours_start: true,
    //     description: true,
    //   },
    //   take: 5,
    //   orderBy: {
    //     date: "asc",
    //   },
    // });

    const get_schedule = await prisma.$queryRaw`
    SELECT 
    id,title,date,date_end,hours_start,hours_end,description
    FROM "Schedule_Event" 
    WHERE  DATE(${date}) BETWEEN DATE(date) AND DATE(date_end) 
    ORDER BY date ASC
    LIMIT 5
    `;

    const get_reflection = await prisma.$queryRaw`
    SELECT emotion,
    COUNT(emotion) as count_emotion
    FROM "Attendence"
    GROUP BY emotion
    `;

    const get_cost = await prisma.$queryRaw`
    SELECT 
    SUM("Payroll".total_salary) as total_cost
    FROM "Payroll"
    `;

    const get_cost_month = await prisma.$queryRaw`
    SELECT
    SUM("Payroll".total_salary)::integer as total_cost,
    period_month
    FROM "Payroll"
    GROUP BY period_month
    `;
    const get_request_leave = await prisma.annualLeave.findMany({
      where: {
        status: "Waiting",
      },
      select: {
        type: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      take: 5,
    });
    const payload = {
      on_time: count_attendence[0].on_time,
      late: count_attendence[0].late,
      leave: count_leave[0].leave,
      total_employee: count_employee[0].total_employee,
      schedule: get_schedule,
      get_reflection: get_reflection,
      get_cost: get_cost[0].total_cost,
      get_cost_month: get_cost_month,
      get_request_leave: get_request_leave,
    };

    return NextResponse.json({
      data: payload,
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
