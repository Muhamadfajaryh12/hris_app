import FormDetailOvertime from "@/components/overtime/FormDetailOvertime";
import OvertimeAPI from "@/data/OvertimeAPI";
import MainLayout from "@/layouts/MainLayout";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const leaderId = cookieStore.get("user_id")?.value;
  const data = await OvertimeAPI.GetDetailOvertime({ id: id });

  return (
    <MainLayout title={["Overtime", "Detail"]}>
      <FormDetailOvertime data={data} leaderId={leaderId} />
    </MainLayout>
  );
};

export default page;
