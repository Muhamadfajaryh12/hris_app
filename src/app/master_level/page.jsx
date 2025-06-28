import MasterLevelComponent from "@/components/master_level/MasterLevelComponent";
import LevelAPI from "@/data/LevelAPI";

import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await LevelAPI.GetLevel();
  return (
    <MainLayout title={["Master Level"]}>
      <MasterLevelComponent data={data} />
    </MainLayout>
  );
};

export default page;
