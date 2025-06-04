"use client";
import CustomDataTable from "@/components/CustomDataTable";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data } = useFetch(`http://localhost:3000/api/employee`);

  const columns = [
    {
      accessorKey: "npk",
      header: "NPK",
    },
    {
      accessorKey: "name",
      header: "Name Employee",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "no_telp",
      header: "Telephone",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "section.section",
      header: "Section",
    },
    {
      accessorKey: "level.level",
      header: "Level",
    },
    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return <Button variant="secondary">Action</Button>;
      },
    },
  ];
  return (
    <MainLayout title="Master Employee">
      <Button asChild size="sm">
        <Link href="/master_employee/form">Create</Link>
      </Button>
      <CustomDataTable columns={columns} data={data} />
    </MainLayout>
  );
};

export default page;
