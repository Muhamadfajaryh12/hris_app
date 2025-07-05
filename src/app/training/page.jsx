import TrainingComponent from "@/components/training/TrainingComponent";
import TrainingAPI from "@/data/TrainingAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await TrainingAPI.GetTraining();
  return (
    <MainLayout title={["Training"]}>
      <TrainingComponent dataTraining={data} />
    </MainLayout>
  );
};

export default page;
