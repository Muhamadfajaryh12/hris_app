import FormMasterPositionComponent from "@/components/master_position/FormMasterPositionComponent";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = () => {
  return (
    <MainLayout title={["Master Position", "Form"]}>
      <FormMasterPositionComponent />
    </MainLayout>
  );
};

export default page;
