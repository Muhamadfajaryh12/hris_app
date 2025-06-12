"use server";
import MasterEmployee from "@/components/master_employe/MasterEmployeComponent";
import EmployeeAPI from "@/data/EmployeeAPI";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = async () => {
  const data = await EmployeeAPI.GetEmployee({ id: "" });
  return (
    <MainLayout title="Master Employee">
      <MasterEmployee data={data} />
    </MainLayout>
  );
};

export default page;
