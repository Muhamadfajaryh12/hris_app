import FormContract from "@/components/contract/FormContract";
import EmployeeAPI from "@/data/EmployeeAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const dataEmployee = await EmployeeAPI.GetEmployee();
  return (
    <MainLayout title={["Contract", "Form"]}>
      <FormContract dataEmployee={dataEmployee} />
    </MainLayout>
  );
};

export default page;
