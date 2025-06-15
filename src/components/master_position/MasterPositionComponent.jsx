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
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import CustomAlertDialog from "../CustomAlertDialog";
import { useCurrency } from "@/hooks/useCurrency";

const MasterPositionComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      header: "Base Salary",
      cell: ({ row }) => {
        return <p>{useCurrency(row?.original?.base_salary)}</p>;
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
                <Link href={`/master/master_position/form/${row.original.id}`}>
                  Update
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View employee</DropdownMenuItem>
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
        link={"/master/master_position/form"}
        titleButton="Create position"
        data={data}
      />
      <CustomAlertDialog setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default MasterPositionComponent;
