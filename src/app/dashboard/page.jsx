import DashboardComponent from "@/components/dashboard/DashboardComponent";
import DashboardAPI from "@/data/DashboardAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const DashboardPage = async () => {
  const data = await DashboardAPI.getDashboard({
    date: new Date().toISOString().split("T")[0],
  });
  return (
    <MainLayout>
      <DashboardComponent data={data} />
    </MainLayout>
  );
};

export default DashboardPage;
