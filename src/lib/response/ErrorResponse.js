import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export function ErrorResponse(error) {
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  return NextResponse.json(
    { error: "Unknown error occurred" },
    { status: StatusCodes.INTERNAL_SERVER_ERROR }
  );
}
