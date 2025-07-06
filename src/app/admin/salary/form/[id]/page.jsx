import FormSalaryComponent from "@/components/salary/FormSalaryComponent";
import EmployeeAPI from "@/data/EmployeeAPI";
import SalaryAPI from "@/data/SalaryAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const [dataEmployee, dataSalary] = await Promise.all([
    EmployeeAPI.GetEmployee(),
    SalaryAPI.GetDetailSalary({ id: id }),
  ]);

  return (
    <MainLayout title={["Salary", "Form", "Edit"]}>
      <FormSalaryComponent
        dataEmployee={dataEmployee}
        dataSalary={dataSalary}
      />
    </MainLayout>
  );
};

export default page;
