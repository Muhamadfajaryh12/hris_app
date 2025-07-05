import DashboardComponent from "@/components/dashboard/DashboardComponent";
import DashboardAPI from "@/data/DashboardAPI";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const DashboardPage = async () => {
  const date = new Date();
  const formatted = date.toISOString().split("T")[0];
  const data = await DashboardAPI.getDashboard({ date: formatted });

  return (
    <MainLayout title={["Dashboard"]}>
      <DashboardComponent data={data} />
    </MainLayout>
  );
};

export default DashboardPage;
