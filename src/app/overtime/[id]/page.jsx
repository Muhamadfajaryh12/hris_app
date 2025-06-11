import FormDetailOvertime from "@/components/overtime/FormDetailOvertime";
import OvertimeAPI from "@/data/OvertimeAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const data = await OvertimeAPI.GetOvertime({ url: `?id=${params.id}` });
  return (
    <MainLayout>
      <FormDetailOvertime data={data} />
    </MainLayout>
  );
};

export default page;
