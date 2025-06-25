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
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const ContractComponent = ({ dataContract }) => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      accessorKey: "employee.npk",
      header: "NPK",
    },
    {
      accessorKey: "employee.name",
      header: "Name",
    },
    {
      header: "Period",
      cell: ({ row }) => {
        return (
          <p>
            {new Date(row.original.start_date).toLocaleDateString()} -{" "}
            {new Date(row.original.end_date).toLocaleDateString()}
          </p>
        );
      },
    },
    {
      header: "Type",
      cell: ({ row }) => {
        return (
          <div
            className={`border text-center p-2 ${
              row.original.contract_type == "Permanent"
                ? "border-blue-800 bg-blue-200 text-blue-800"
                : row.original.contract_type == "Internship"
                ? "border-violet-800 bg-violet-200 text-violet-800"
                : "border-orange-800 bg-orange-200 text-orange-800"
            }`}
          >
            <p>{row.original.contract_type}</p>
          </div>
        );
      },
    },

    {
      header: "Status",
      cell: ({ row }) => {
        return (
          <div
            className={`border text-center p-2 ${
              row.original.status == "Active"
                ? "border-green-800 bg-green-200 text-green-800"
                : "border-red-800 bg-red-200 text-red-800"
            }`}
          >
            <p>{row.original.status}</p>
          </div>
        );
      },
    },
    {
      header: "Contract File",
      cell: ({ row }) => {
        return <Button size="sm">FILE CONTRACT</Button>;
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

              <div className="">
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/contract/form/${row.original.id}`}>Update</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setIsOpen(true), setId(row.original.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <CustomDataTable
      data={dataContract}
      columns={columns}
      titleButton={"New Contract"}
      link={"/contract/form"}
    />
  );
};

export default ContractComponent;
