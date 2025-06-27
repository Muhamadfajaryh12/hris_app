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
import Badge from "../Badge";
import SectionCard from "../SectionCard";
import { useFormattedDate } from "@/hooks/useFormattedDate";
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
        return <p>{useFormattedDate(row.original.date)}</p>;
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
      accessorKey: "user.position.position",
      header: "Position",
    },
    {
      header: "Status",
      id: "approval_leader",
      accessorFn: (row) => row.approval_leader?.toString() || "",
      cell: ({ row }) => {
        return <Badge status={row.original.approval_leader} />;
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
              {row.original.approval_leader == "Waiting" ? (
                <>
                  <DropdownMenuItem>
                    <Link href={`/overtime/form/${row.original.id}`}>
                      Update
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ) : (
                ""
              )}
              <DropdownMenuItem>
                <Link href={`/overtime/${row.original.id}`}>View request</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const dataFilterSelect = [
    {
      value: "Approved",
    },
    {
      value: "Waiting",
    },
    {
      value: "Rejected",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data.status_count.map((item, index) => (
          <SectionCard
            title={item.approval_leader}
            count={item.count}
            key={index}
            styleCard={
              item.approval_leader === "Waiting"
                ? "bg-blue-100 border-blue-300 text-blue-800"
                : item.approval_leader === "Rejected"
                ? "bg-red-100 border-red-300 text-red-800"
                : item.approval_leader === "Approved"
                ? "bg-green-100 border-green-300 text-green-800"
                : ""
            }
          />
        ))}
      </div>
      <CustomDataTable
        columns={columns}
        data={data.data}
        link={"/overtime/form"}
        titleButton="Request Overtime"
        filterSearch="name"
        filterSelect="approval_leader"
        dataFilterSelect={dataFilterSelect}
        placeholder="Search by name"
      />
      <CustomAlertDialog setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default OvertimeComponent;
