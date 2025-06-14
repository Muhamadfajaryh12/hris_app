import ScheduleComponent from "@/components/schedule/ScheduleComponent";
import ScheduleEventAPI from "@/data/ScheduleEventAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await ScheduleEventAPI.GetSchedule();
  return (
    <MainLayout>
      <ScheduleComponent data={data} />
    </MainLayout>
  );
};

export default page;
