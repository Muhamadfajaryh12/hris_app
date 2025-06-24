import FormMasterSectionComponent from "@/components/master_section/FormMasterSectionComponent";
import SectionAPI from "@/data/SectionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const data = await SectionAPI.GetDetailSection({ id: params.id });
  return (
    <MainLayout title={["Master Section", "Form", "Update"]}>
      <FormMasterSectionComponent dataSection={data} />
    </MainLayout>
  );
};

export default page;
