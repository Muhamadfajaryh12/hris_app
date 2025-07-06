import ContractComponent from "@/components/contract/ContractComponent";
import ContractAPI from "@/data/ContractAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await ContractAPI.GetContract();
  return (
    <MainLayout title={["Contract"]}>
      <ContractComponent dataContract={data} />
    </MainLayout>
  );
};

export default page;
