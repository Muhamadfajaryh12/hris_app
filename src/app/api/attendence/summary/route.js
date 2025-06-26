import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const result = await prisma.$queryRaw`
    SELECT 
    "User".id,
    "User".name,
    "Attendence".status,
    "Attendence".created_at
    FROM "User"
    LEFT JOIN "Attendence" ON "Attendence"."userId" = "User".id AND
    EXTRACT(YEAR FROM "Attendence".created_at) = ${year}::integer
    AND EXTRACT(MONTH FROM "Attendence".created_at) = ${month}::integer
        `;

    const usersMap = {};
    for (const row of result) {
      const { id, name, status, created_at } = row;
      if (!usersMap[id]) {
        usersMap[id] = {
          id,
          name,
          attendance: {},
          total: 0,
        };
      }
      if (status && created_at) {
        const date = new Date(created_at);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const key = `${day}-${month}`;

        usersMap[id].attendance[key] = status;
        usersMap[id].total += 1;
      }
    }
    return NextResponse.json({
      data: Object.values(usersMap),
      status: StatusCodes.OK,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
}
