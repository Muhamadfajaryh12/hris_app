import FormOvertime from "@/components/overtime/FormOvertime";
import ShiftAPI from "@/data/ShiftAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const dataShift = await ShiftAPI.GetShift();
  return (
    <MainLayout>
      <FormOvertime dataShift={dataShift} />
    </MainLayout>
  );
};

export default page;
