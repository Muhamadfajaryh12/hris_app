import FormSalaryComponent from "@/components/salary/FormSalaryComponent";
import EmployeeAPI from "@/data/EmployeeAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const dataEmployee = await EmployeeAPI.GetEmployee();
  return (
    <MainLayout>
      <FormSalaryComponent dataEmployee={dataEmployee} />
    </MainLayout>
  );
};

export default page;
