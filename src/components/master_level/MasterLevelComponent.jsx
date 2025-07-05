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
import LevelAPI from "@/data/LevelAPI";
import { toast } from "sonner";

const MasterLevelComponent = ({ dataLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(dataLevel);
  const columns = [
    {
      accessorKey: "level",
      header: "Name Level",
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
                <Link href={`/master_level/form/${row.original.id}`}>
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
    const response = await LevelAPI.DeleteLevel({ id: id });
    if (response.status == 200) {
      toast(response.message);
      setData((prev) => prev.filter((item) => item.id != response.data.id));
    }
  });

  return (
    <>
      <CustomDataTable
        columns={columns}
        data={data}
        link={"/master_level/form"}
        titleButton="Create level"
      />
      <CustomAlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClick={handleDelete}
        id={selectedId}
      />
    </>
  );
};

export default MasterLevelComponent;
