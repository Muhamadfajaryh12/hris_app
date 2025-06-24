import FormShiftComponent from "@/components/master_shift/FormShiftComponent";
import ShiftAPI from "@/data/ShiftAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await ShiftAPI.GetDetailShift({ id: id });
  return (
    <MainLayout title={["Master Shift", "Form", "Update"]}>
      <FormShiftComponent dataShift={data} />
    </MainLayout>
  );
};

export default page;
