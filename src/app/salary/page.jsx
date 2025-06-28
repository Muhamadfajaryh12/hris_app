import SalaryComponent from "@/components/salary/SalaryComponent";
import PositionAPI from "@/data/PositionAPI";
import SalaryAPI from "@/data/SalaryAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await SalaryAPI.GetSalary();
  const dataPosition = await PositionAPI.GetPosition();
  return (
    <MainLayout title={["Salary"]}>
      <SalaryComponent data={data} dataPosition={dataPosition} />
    </MainLayout>
  );
};

export default page;
