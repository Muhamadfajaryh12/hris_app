"use server";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import AttendenceComponent from "@/components/attendence/AttendenceComponent";
import { cookies } from "next/headers";
import AttendenceAPI from "@/data/AttendenceAPI";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import AnnualLeaveComponent from "@/components/attendence/AnnualLeaveComponent";

const page = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const dataAttendence = await AttendenceAPI.GetAttendence({ id: userId });
  const dataAnnualLeave = await AnnualLeaveAPI.GetAnnualLeave({ id: userId });
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <AttendenceComponent data={dataAttendence} />
        <AnnualLeaveComponent data={dataAnnualLeave} />
      </div>
    </MainLayout>
  );
};

export default page;
