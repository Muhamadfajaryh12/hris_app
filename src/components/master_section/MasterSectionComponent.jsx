"use client";
import React, { useCallback, useState } from "react";
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
import SectionAPI from "@/data/SectionAPI";
import { toast } from "sonner";

const MasterSectionComponent = ({ dataSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(dataSection);
  const [selectedId, setSelectedId] = useState(null);
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
                <Link href={`/master_section/form/${row.original.id}`}>
                  Update
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                  setSelectedId(row.original.id);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id) => {
    const response = await SectionAPI.DeleteSection({ id: id });
    if (response.status == 200) {
      toast(response.message);
      setData((prev) => prev.filter((item) => item.id != response.data.id));
    }
  });

  return (
    <div>
      <CustomDataTable
        columns={columns}
        data={data}
        link={"/master_section/form"}
        titleButton="Create Section"
      />
      <CustomAlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={selectedId}
        handleClick={handleDelete}
      />
    </div>
  );
};

export default MasterSectionComponent;
