import FormTraining from "@/components/training/FormTraining";
import MainLayout from "@/layouts/MainLayout";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();
  const id = cookieStore.get("user_id")?.value;
  return (
    <MainLayout>
      <FormTraining userId={id} />
    </MainLayout>
  );
};

export default page;
