import PayrollComponent from "@/components/payroll/PayrollComponent";
import PayRollAPI from "@/data/PayRollAPI";
import SalaryAPI from "@/data/SalaryAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await PayRollAPI.GetPayRoll();
  return (
    <MainLayout title={["Payroll"]}>
      <PayrollComponent data={data} />
    </MainLayout>
  );
};

export default page;
