import ScheduleComponent from "@/components/schedule/ScheduleComponent";
import LevelAPI from "@/data/LevelAPI";
import ScheduleEventAPI from "@/data/ScheduleEventAPI";
import SectionAPI from "@/data/SectionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const [dataSchedule, dataSection, dataLevel] = await Promise.all([
    ScheduleEventAPI.GetSchedule(),
    SectionAPI.GetSection(),
    LevelAPI.GetLevel(),
  ]);
  return (
    <MainLayout title={["Schedule"]}>
      <ScheduleComponent
        dataSchedule={dataSchedule}
        dataSection={dataSection}
        dataLevel={dataLevel}
      />
    </MainLayout>
  );
};

export default page;
