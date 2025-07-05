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
import ShiftAPI from "@/data/ShiftAPI";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

const MasterShiftComponent = ({ dataShift }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(dataShift);
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
                <Link href={`/master_employee/form/${row.original.id}`}>
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
    const response = await ShiftAPI.DeletedShift({ id: id });
    if (response.status) {
      toast(response.message);
      setData((prev) => prev.filter((item) => item.id != response.data.id));
    }
  });
  return (
    <div>
      <CustomDataTable
        columns={columns}
        data={data}
        link={"/master_shift/form"}
        titleButton="Create shift"
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

export default MasterShiftComponent;
