import CustomDataTable from "@/components/CustomDataTable";
import OvertimeComponent from "@/components/overtime/OvertimeComponent";
import OvertimeAPI from "@/data/OvertimeAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await OvertimeAPI.GetOvertime({ url: "" });
  return (
    <MainLayout title="Overtime">
      <OvertimeComponent data={data} />
    </MainLayout>
  );
};

export default page;
