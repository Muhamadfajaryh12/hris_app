import FormMasterEmployeComponent from "@/components/master_employe/FormMasterEmployeComponent";
import LevelAPI from "@/data/LevelAPI";
import PositionAPI from "@/data/PositionAPI";
import SectionAPI from "@/data/SectionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const [dataSection, dataLevel, dataPosition] = await Promise.all([
    SectionAPI.GetSection(),
    LevelAPI.GetLevel(),
    PositionAPI.GetPosition(),
  ]);

  return (
    <MainLayout title={["Employee", "Form"]}>
      <FormMasterEmployeComponent
        dataSection={dataSection}
        dataLevel={dataLevel}
        dataPosition={dataPosition}
      />
    </MainLayout>
  );
};

export default page;
