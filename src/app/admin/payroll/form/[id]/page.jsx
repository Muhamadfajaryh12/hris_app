import FormPayrollComponent from "@/components/payroll/FormPayrollComponent";
import EmployeeAPI from "@/data/EmployeeAPI";
import PayRollAPI from "@/data/PayRollAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const dataPayroll = await PayRollAPI.GetDetailPayroll({ id: id });
  const dataDetailEmployee = await EmployeeAPI.GetDetailMasterEmployee({
    id: dataPayroll.employeeId,
  });
  const dataEmployee = await EmployeeAPI.GetEmployee();
  return (
    <MainLayout title={["Payroll", "Form", "Edit"]}>
      <FormPayrollComponent
        dataEmploye={dataEmployee}
        dataPayroll={dataPayroll}
        datas={dataDetailEmployee}
      />
    </MainLayout>
  );
};

export default page;
