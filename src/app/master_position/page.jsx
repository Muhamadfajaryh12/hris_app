import MasterPositionComponent from "@/components/master_position/MasterPositionComponent";
import PositionAPI from "@/data/PositionAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await PositionAPI.GetPosition();
  return (
    <MainLayout title={["Master Position"]}>
      <MasterPositionComponent dataPosition={data} />
    </MainLayout>
  );
};

export default page;
