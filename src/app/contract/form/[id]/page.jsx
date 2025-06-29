import FormContract from "@/components/contract/FormContract";
import ContractAPI from "@/data/ContractAPI";
import EmployeeAPI from "@/data/EmployeeAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const dataContract = await ContractAPI.GetDetailContract({ id: id });
  const dataEmployee = await EmployeeAPI.GetEmployee();
  return (
    <MainLayout>
      <FormContract dataEmployee={dataEmployee} dataContract={dataContract} />
    </MainLayout>
  );
};

export default page;
