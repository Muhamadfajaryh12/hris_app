"use server";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/level`);
  const data = await res.json();

  return data;
};
const page = async () => {
  const test = await getServerSideProps();
  return <MainLayout></MainLayout>;
};

export default page;
