import DetailRequestLeaveComponent from "@/components/request_leave/DetailRequestLeaveComponent";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import MainLayout from "@/layouts/MainLayout";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const data = await AnnualLeaveAPI.GetDetailAnnualLeave({ id: id });
  return (
    <MainLayout>
      <DetailRequestLeaveComponent data={data} userId={userId} />
    </MainLayout>
  );
};

export default page;
