import FormMasterLevelComponent from "@/components/master_level/FormMasterLevelComponent";
import LevelAPI from "@/data/LevelAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await LevelAPI.GetDetailLevel({ id: id });
  return (
    <MainLayout title={["Master Level", "Form", "Update"]}>
      <FormMasterLevelComponent dataLevel={data} />
    </MainLayout>
  );
};

export default page;
