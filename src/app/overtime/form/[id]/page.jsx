import FormOvertime from "@/components/overtime/FormOvertime";
import OvertimeAPI from "@/data/OvertimeAPI";
import ShiftAPI from "@/data/ShiftAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const [dataOvertime, dataShift] = await Promise.all([
    OvertimeAPI.GetDetailOvertime({ id }),
    ShiftAPI.GetShift(),
  ]);
  return (
    <MainLayout title={["Overtime", "Form", "Update"]}>
      <FormOvertime dataShift={dataShift} dataOvertime={dataOvertime} />
    </MainLayout>
  );
};

export default page;
