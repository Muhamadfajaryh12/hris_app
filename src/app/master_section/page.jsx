import MasterSectionComponent from "@/components/master_section/MasterSectionComponent";
import SectionAPI from "@/data/SectionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await SectionAPI.GetSection();
  return (
    <MainLayout title={["Master Section"]}>
      <MasterSectionComponent data={data} />
    </MainLayout>
  );
};

export default page;
