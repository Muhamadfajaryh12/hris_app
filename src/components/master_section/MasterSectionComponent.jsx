"use client";
import React, { useState } from "react";
import CustomDataTable from "../CustomDataTable";
import CustomAlertDialog from "../CustomAlertDialog";
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

const MasterSectionComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      accessorKey: "section",
      header: "Name Section",
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
                <Link href={`/master/master_section/form/${row.original.id}`}>
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
        link={"/master/master_section/form"}
        titleButton="Create section"
      />
      <CustomAlertDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MasterSectionComponent;
