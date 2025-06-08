"use client";
import CustomAlertDialog from "@/components/CustomAlertDialog";
import CustomDataTable from "@/components/CustomDataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const { data } = useFetch(`http://localhost:3000/api/employee`);
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      accessorKey: "npk",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            NPK
            <ArrowUpDown />
          </Button>
        );
      },
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
                <Link href={`/master/master_employee/form/${row.original.id}`}>
                  Update
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View employee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <MainLayout title="Master Employee">
      <CustomDataTable
        columns={columns}
        data={data}
        link={"/master/master_employee/form"}
        titleButton="Create employee"
        filterColumn="name"
        placeholder="Search by name"
      />
      <CustomAlertDialog setIsOpen={setIsOpen} isOpen={isOpen} />
    </MainLayout>
  );
};

export default page;
