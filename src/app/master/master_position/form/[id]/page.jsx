import FormMasterPositionComponent from "@/components/master_position/FormMasterPositionComponent";
import PositionAPI from "@/data/PositionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await PositionAPI.GetDetailPosition({ id: id });

  return (
    <MainLayout title={["Master Position", "Form", "Update"]}>
      <FormMasterPositionComponent dataPosition={data} />
    </MainLayout>
  );
};

export default page;
