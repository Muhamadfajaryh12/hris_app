"use client";
import React, { useState } from "react";
import CustomDataTable from "../CustomDataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TrainingComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      accessorKey: "user.npk",
      header: "NPK",
    },
    {
      id: "name",
      accessorKey: "user.name",
      header: "Name",
    },
    {
      accessorKey: "user.position.position",
      header: "Position",
    },
    {
      accessorKey: "title",
      header: "Training",
    },
    {
      accessorKey: "training_type",
      header: "Type",
    },
    {
      id: "training_category",
      accessorKey: "training_category",
      header: "Category",
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/request_leave/form/${row.original.id}`}>
                  Update
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href={`/request_leave/${row.original.id}`}>
                  View Detail
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const dataFilterSelect = [
    {
      value: "Internal",
    },
    {
      value: "Eksternal",
    },
  ];
  return (
    <div>
      <CustomDataTable
        data={data}
        columns={columns}
        link="/training/form"
        titleButton="Add Training"
        placeholder="Search by name"
        filterSearch="name"
        filterSelect="training_category"
        dataFilterSelect={dataFilterSelect}
      />
    </div>
  );
};

export default TrainingComponent;
