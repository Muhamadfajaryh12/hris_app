"use client";
import React from "react";
import CustomDataTable from "../CustomDataTable";
import { useCurrency } from "@/hooks/useCurrency";
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
const SalaryComponent = ({ data }) => {
  const columns = [
    {
      accessorKey: "employee.name",
      header: "Name Employee",
    },
    {
      accessorKey: "employee.position.position",
      header: "Position",
    },
    {
      header: "Basic Salary",
      cell: ({ row }) => {
        return <p>{useCurrency(row?.original?.basic_salary)}</p>;
      },
    },
    {
      header: "Increase Salary",
      cell: ({ row }) => {
        return <p>{useCurrency(row?.original?.increase_salary)}</p>;
      },
    },
    {
      header: "Total Salary",
      cell: ({ row }) => {
        return <p>{useCurrency(row?.original?.total_salary)}</p>;
      },
    },
    {
      header: "Date",
      cell: ({ row }) => {
        return (
          <p>
            {new Date(row?.original?.start_date).toLocaleDateString()} -{" "}
            {new Date(row?.original?.end_date).toLocaleDateString()}
          </p>
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
    <CustomDataTable
      data={data}
      columns={columns}
      link={"/salary/form"}
      titleButton="Create salary"
    />
  );
};

export default SalaryComponent;
