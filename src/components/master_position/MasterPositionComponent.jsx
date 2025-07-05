"use client";
import React, { useCallback, useState } from "react";
import CustomDataTable from "../CustomDataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import CustomAlertDialog from "../CustomAlertDialog";
import { useCurrency } from "@/hooks/useCurrency";
import PositionAPI from "@/data/PositionAPI";
import { toast } from "sonner";

const MasterPositionComponent = ({ dataPosition }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(dataPosition);
  const columns = [
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      id: "base_salary",
      accessorKey: "base_salary",
      enableSorting: true,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Base Salary
            <ArrowUpDown />
          </Button>
        );
      },
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
                <Link href={`/master_position/form/${row.original.id}`}>
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
              <DropdownMenuItem>View employee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id) => {
    const response = await PositionAPI.DeletePosition({ id: id });
    if (response.status == 200) {
      toast(response.message);
      setData((prev) => prev.filter((item) => item.id != response.data.id));
    }
  });

  return (
    <div>
      <CustomDataTable
        columns={columns}
        link={"/master_position/form"}
        titleButton="Create Position"
        data={data}
      />
      <CustomAlertDialog
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        id={selectedId}
        handleClick={handleDelete}
      />
    </div>
  );
};

export default MasterPositionComponent;
