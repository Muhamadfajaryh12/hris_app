import LoadingComponent from "@/components/LoadingComponent";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const loading = () => {
  return (
    <MainLayout>
      <LoadingComponent />
    </MainLayout>
  );
};

export default loading;
