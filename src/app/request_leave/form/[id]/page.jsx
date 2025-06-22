import FormRequestLeave from "@/components/request_leave/FormRequestLeave";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await AnnualLeaveAPI.GetDetailAnnualLeave({ id: id });
  return (
    <MainLayout>
      <FormRequestLeave dataRequestLeave={data} />
    </MainLayout>
  );
};

export default page;
