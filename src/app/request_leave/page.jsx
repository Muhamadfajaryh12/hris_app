import RequestLeaveComponent from "@/components/request_leave/RequestLeaveComponent";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import MainLayout from "@/layouts/MainLayout";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const storeCookies = await cookies();
  const userId = storeCookies.get("user_id")?.value;
  const data = await AnnualLeaveAPI.GetAnnualLeave({ id: userId });
  return (
    <MainLayout title={["Request Leave"]}>
      <RequestLeaveComponent data={data} />
    </MainLayout>
  );
};

export default page;
