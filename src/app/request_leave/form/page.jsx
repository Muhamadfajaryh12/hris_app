import FormRequestLeave from "@/components/request_leave/FormRequestLeave";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = () => {
  return (
    <MainLayout title={["Request Leave", "Form"]}>
      <FormRequestLeave />
    </MainLayout>
  );
};

export default page;
