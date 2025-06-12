import MainLayout from "@/layouts/MainLayout";
import React from "react";

import FormMasterEmployeComponent from "@/components/master_employe/FormMasterEmployeComponent";
import SectionAPI from "@/data/SectionAPI";
import LevelAPI from "@/data/LevelAPI";
import PositionAPI from "@/data/PositionAPI";
import EmployeeAPI from "@/data/EmployeeAPI";
const page = async ({ params }) => {
  const [dataSection, dataLevel, dataPosition, dataEmployee] =
    await Promise.all([
      SectionAPI.GetSection(),
      LevelAPI.GetLevel(),
      PositionAPI.GetPosition(),
      EmployeeAPI.GetDetailEmployee({ id: params.id }),
    ]);

  return (
    <MainLayout>
      <FormMasterEmployeComponent
        dataSection={dataSection}
        dataLevel={dataLevel}
        dataPosition={dataPosition}
        dataEmployee={dataEmployee}
      />
    </MainLayout>
  );
};

export default page;
