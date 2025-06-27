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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MasterEmployee = ({ data }) => {
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
      header: "Contact",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      id: "section",
      accessorKey: "section.section",
      header: "Section",
    },
    {
      accessorKey: "position.position",
      header: "Position",
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
              <DropdownMenuItem>View Employee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const dataFilterSelect = Array.from(
    new Set(data.map((item) => item.section.section))
  ).map((value) => ({ value }));

  return (
    <div>
      <CustomDataTable
        columns={columns}
        data={data}
        link={"/master/master_employee/form"}
        titleButton="Create employee"
        filterSearch="name"
        filterSelect="section"
        placeholder="Search by name"
        dataFilterSelect={dataFilterSelect}
      />
      <CustomAlertDialog setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default MasterEmployee;
