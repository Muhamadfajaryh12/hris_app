import FormShiftComponent from "@/components/master_shift/FormShiftComponent";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = () => {
  return (
    <MainLayout title={["Master Position", "Form"]}>
      <FormShiftComponent />
    </MainLayout>
  );
};

export default page;
