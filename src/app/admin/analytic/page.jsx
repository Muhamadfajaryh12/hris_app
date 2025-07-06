import EmployeeAnalyticComponent from "@/components/analytic/EmployeeAnalyticComponent";
import DashboardAPI from "@/data/DashboardAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await DashboardAPI.getAnalyticDashboard();
  return (
    <MainLayout title={["Dashboard", "Analyitic"]}>
      <EmployeeAnalyticComponent data={data} />
    </MainLayout>
  );
};

export default page;
