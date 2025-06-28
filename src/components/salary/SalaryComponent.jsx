"use client";
import React, { useMemo } from "react";
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
import { useFormattedDate } from "@/hooks/useFormattedDate";
const SalaryComponent = ({ data, dataPosition }) => {
  const columns = [
    {
      id: "employee",
      accessorKey: "employee.name",
      header: "Name Employee",
    },
    {
      id: "position",
      accessorKey: "employee.position.position",
      header: "Position",
    },
    {
      id: "base_salary",
      accessorKey: "basic_salary",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Base Salary
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p>{useCurrency(row?.original?.basic_salary)}</p>;
      },
    },
    {
      id: "increase_salary",
      accessorKey: "increase_salary",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Increase Salary
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p>{useCurrency(row?.original?.increase_salary)}</p>;
      },
    },
    {
      id: "total_salary",
      accessorKey: "total_salary",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Total Salary
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p>{useCurrency(row?.original?.total_salary)}</p>;
      },
    },
    {
      header: "Periode",
      cell: ({ row }) => {
        return (
          <p>
            {useFormattedDate(row?.original?.start_date)} -{" "}
            {useFormattedDate(row?.original?.end_date)}
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
                <Link href={`/salary/form/${row.original.id}`}>Update</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const dataFilterSelect = useMemo(
    () =>
      dataPosition.map((item) => ({
        value: item.position,
      })),
    []
  );
  return (
    <CustomDataTable
      data={data}
      columns={columns}
      link={"/salary/form"}
      titleButton="Create salary"
      filterSearch="employee"
      placeholder="Search by name"
      filterSelect="position"
      dataFilterSelect={dataFilterSelect}
    />
  );
};

export default SalaryComponent;
