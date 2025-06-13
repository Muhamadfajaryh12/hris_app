"use client";
import React from "react";
import CustomDataTable from "../CustomDataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Badge from "../Badge";

const RequestLeaveComponent = ({ data }) => {
  const columns = [
    {
      header: "Date",
      id: "date",
      cell: ({ row }) => {
        return (
          <p>{new Date(row?.original?.date_leave).toLocaleDateString()}</p>
        );
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      header: "Approval Leader",
      id: "approval_leader",
      enableHiding: false,
      cell: ({ row }) => {
        return <Badge status={row?.original?.approval_leader} />;
      },
    },
    {
      header: "Approval HRD",
      id: "approval_hrd",
      enableHiding: false,
      cell: ({ row }) => {
        return <Badge status={row?.original?.approval_hrd} />;
      },
    },

    {
      header: "Status",
      id: "status",
      enableHiding: false,
      cell: ({ row }) => {
        return <Badge />;
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
                <Link href={`/request_leave/${row.original.id}`}>Update</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link href={`/request_leave/${row.original.id}`}>
                  View request
                </Link>
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
      link={"/request_leave/form"}
      titleButton="Request leave"
    />
  );
};

export default RequestLeaveComponent;
