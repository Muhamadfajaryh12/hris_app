import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/lib/response/ErrorResponse";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const result = await prisma.$queryRaw`
    SELECT 
    "User".id,
    "User".name,
    "Attendence".status,
    "Attendence".created_at
    FROM "User"
    LEFT JOIN "Attendence" ON "Attendence"."userId" = "User".id
    `;

    const usersMap = {};
    for (const row of result) {
      const { id, name, status, created_at } = row;
      if (!usersMap[id]) {
        usersMap[id] = {
          id,
          name,
          attendance: {},
        };
      }
      if (status && created_at) {
        const date = new Date(created_at);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const key = `${day}-${month}`;

        usersMap[id].attendance[key] = status;
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
