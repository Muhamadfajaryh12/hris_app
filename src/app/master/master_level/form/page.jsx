import FormMasterLevelComponent from "@/components/master_level/FormMasterLevelComponent";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const MasterLevelFormPage = () => {
  return (
    <MainLayout title={"Form Master Level"}>
      <FormMasterLevelComponent />
    </MainLayout>
  );
};

export default MasterLevelFormPage;
