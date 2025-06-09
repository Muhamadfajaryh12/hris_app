"use server";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import AttendenceComponent from "@/components/attendence/AttendenceComponent";
import { cookies } from "next/headers";
import AttendenceAPI from "@/data/AttendenceAPI";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";

const page = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const dataAttendence = await AttendenceAPI.GetAttendence({ id: userId });
  const dataAnnualLeave = await AnnualLeaveAPI.GetAnnualLeave({ id: userId });
  console.log(dataAnnualLeave, dataAttendence);
  return (
    <MainLayout>
      <AttendenceComponent data={dataAttendence} />
    </MainLayout>
  );
};

export default page;
