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
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MasterShiftComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      accessorKey: "title",
      header: "Name Shift",
    },
    {
      accessorKey: "work_time",
      header: "Work Time",
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
        link={"/master/master_shift/form"}
        titleButton="Create shift"
      />
      <CustomAlertDialog setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default MasterShiftComponent;
