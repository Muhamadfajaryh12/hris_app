import FormTraining from "@/components/training/FormTraining";
import TrainingAPI from "@/data/TrainingAPI";
import MainLayout from "@/layouts/MainLayout";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await TrainingAPI.GetDetailTraining({ id: id });
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  return (
    <MainLayout title={["Training", "Form", "Update"]}>
      <FormTraining trainingData={data} userId={userId} />
    </MainLayout>
  );
};

export default page;
