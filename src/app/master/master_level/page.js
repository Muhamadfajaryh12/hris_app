"use client";
import CustomDataTable from "@/components/CustomDataTable";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const page = () => {
  const { data } = useFetch(`http://localhost:3000/api/level`);

  const columns = [
    {
      accessorKey: "level",
      header: "Name Level",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return <Button>Action</Button>;
      },
    },
  ];
  return (
    <MainLayout>
      <CustomDataTable columns={columns} data={data} />
    </MainLayout>
  );
};

export default page;
