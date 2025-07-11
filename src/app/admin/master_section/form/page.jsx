import FormMasterSectionComponent from "@/components/master_section/FormMasterSectionComponent";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const MasterSectionFormPage = () => {
  return (
    <MainLayout title={["Master Section", "Form"]}>
      <FormMasterSectionComponent />
    </MainLayout>
  );
};

export default MasterSectionFormPage;
