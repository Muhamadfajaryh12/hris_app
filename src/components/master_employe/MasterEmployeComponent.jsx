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
import EmployeeAPI from "@/data/EmployeeAPI";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

const MasterEmployee = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Section
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      id: "postion",
      accessorKey: "position.position",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Position
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      id: "level",
      accessorKey: "level.level",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Level
            <ArrowUpDown />
          </Button>
        );
      },
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
                <Link href={`/admin/master_employee/form/${row.original.id}`}>
                  Update
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                  setSelectedId(row.original.id);
                }}
              >
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

  const sectionOptions = Array.from(
    new Set(data.map((item) => item.section.section))
  ).map((value) => ({ value }));

  const levelOptions = Array.from(
    new Set(data.map((item) => item.level.level))
  ).map((value) => ({ value }));

  const dataFilterSelect = [sectionOptions, levelOptions];

  const handleDelete = useCallback(async (id) => {
    const response = await EmployeeAPI.DeleteEmployee({ id: id });
    if (response?.status == 200) {
      toast("Successfully");
    }
  });

  return (
    <div>
      <CustomDataTable
        columns={columns}
        data={data}
        link={"admin/master_employee/form"}
        titleButton="Create employee"
        filterSearch="name"
        filterSelect={["section", "level"]}
        placeholder="Search by name"
        dataFilterSelect={dataFilterSelect}
      />
      <CustomAlertDialog
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        handleClick={handleDelete}
        id={selectedId}
      />
    </div>
  );
};

export default MasterEmployee;
