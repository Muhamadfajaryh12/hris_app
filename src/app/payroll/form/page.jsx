import FormPayrollComponent from "@/components/payroll/FormPayrollComponent";
import EmployeeAPI from "@/data/EmployeeAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await EmployeeAPI.GetEmployee();
  return (
    <MainLayout>
      <FormPayrollComponent dataEmploye={data} />
    </MainLayout>
  );
};

export default page;
