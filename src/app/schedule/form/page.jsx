import FormScheduleComponent from "@/components/schedule/FormScheduleComponent";
import LevelAPI from "@/data/LevelAPI";
import SectionAPI from "@/data/SectionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const dataSection = await SectionAPI.GetSection();
  const dataLevel = await LevelAPI.GetLevel();
  return (
    <MainLayout>
      <FormScheduleComponent dataSection={dataSection} dataLevel={dataLevel} />
    </MainLayout>
  );
};

export default page;
