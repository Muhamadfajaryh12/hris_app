import PayrollDetailComponent from "@/components/payroll/PayrollDetailComponent";
import PayRollAPI from "@/data/PayRollAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await PayRollAPI.GetDetailPayroll({ id: id });
  return (
    <MainLayout title={["Payroll", "Detail"]}>
      <PayrollDetailComponent data={data} />
    </MainLayout>
  );
};

export default page;
