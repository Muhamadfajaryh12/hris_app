import SummaryAttendence from "@/components/attendence/SummaryAttendence";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = () => {
  return (
    <MainLayout title={["Attendence", "Summary"]}>
      <SummaryAttendence />
    </MainLayout>
  );
};

export default page;
