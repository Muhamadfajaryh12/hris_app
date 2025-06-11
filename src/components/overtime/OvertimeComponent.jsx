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
const OvertimeComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      accessorKey: "user.npk",
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
      id: "name",
      accessorKey: "user.name",
      header: "Name Employee",
    },
    {
      header: "Date",
      cell: ({ row }) => {
        return <p>{new Date(row?.original?.date).toLocaleDateString()}</p>;
      },
    },
    {
      accessorKey: "overtime_duration",
      header: "Overtime Duration",
    },
    {
      accessorKey: "break_duration",
      header: "Break Duration",
    },
    {
      accessorKey: "shift.title",
      header: "Shift",
    },
    {
      header: "Approval Leader",
      id: "approval_leader",
      enableHiding: false,
      cell: ({ row }) => {
        if (row.original.approval_leader === null)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-blue-500 w-24 text-center ">
              Waiting
            </div>
          );
        if (row.original.approval_leader === true)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-green-500 w-24 text-center ">
              Approved
            </div>
          );
        if (row.original.approval_leader === false)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-red-500 w-24 text-center ">
              Rejected
            </div>
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
                <Link href={`/master/master_employee/form/${row.original.id}`}>
                  Update
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/overtime/${row.original.id}`}>View request</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <div>
      <CustomDataTable
        columns={columns}
        data={data}
        link={"/overtime/form"}
        titleButton="Request Overtime"
        filterColumn="name"
        placeholder="Search by name"
      />
      <CustomAlertDialog setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default OvertimeComponent;
