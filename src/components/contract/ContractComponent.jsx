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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import SectionCard from "../SectionCard";
import { useFormattedDate } from "@/hooks/useFormattedDate";

const ContractComponent = ({ dataContract }) => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      id: "npk",
      accessorKey: "employee.npk",
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
      accessorKey: "employee.name",
      header: "Name",
    },
    {
      id: "position",
      accessorKey: "employee.position.position",
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
      id: "Period",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Periode
            <ArrowUpDown />
          </Button>
        );
      },
      accessorFn: (row) =>
        `${useFormattedDate(row.start_date)} - ${useFormattedDate(
          row.end_date
        )}`,
      cell: ({ row }) => {
        return (
          <p>
            {useFormattedDate(row.original.start_date)} -{" "}
            {useFormattedDate(row.original.end_date)}
          </p>
        );
      },
    },
    {
      id: "contract_type",
      header: "Type",
      accessorFn: (row) => row.contract_type.toString(),
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
      id: "status",
      header: "Status",
      accessorFn: (row) => row.status,
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

  const typeOptions = [
    {
      value: "Internship",
    },
    {
      value: "Permanent",
    },
    {
      value: "Contract",
    },
  ];

  const statusOptions = [
    {
      value: "Active",
    },
    {
      value: "Expired",
    },
  ];

  const dataFilterSelect = [typeOptions, statusOptions];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {dataContract.countContract.map((item, index) => (
          <SectionCard
            title={item.contract_type}
            count={item.total}
            key={index}
            styleCard={
              item.contract_type === "Internship"
                ? "border-violet-800 bg-violet-200 text-violet-800"
                : item.contract_type === "Contract"
                ? "border-orange-800 bg-orange-200 text-orange-800"
                : "border-blue-800 bg-blue-200 text-blue-800"
            }
          />
        ))}
      </div>
      <CustomDataTable
        data={dataContract.result}
        columns={columns}
        titleButton={"New Contract"}
        link={"/contract/form"}
        filterSearch={"name"}
        placeholder={"Search by name"}
        filterSelect={["contract_type", "status"]}
        dataFilterSelect={dataFilterSelect}
      />
    </>
  );
};

export default ContractComponent;
