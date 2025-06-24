import SalaryComponent from "@/components/salary/SalaryComponent";
import SalaryAPI from "@/data/SalaryAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await SalaryAPI.GetSalary();
  return (
    <MainLayout title={["Salary"]}>
      <SalaryComponent data={data} />
    </MainLayout>
  );
};

export default page;
