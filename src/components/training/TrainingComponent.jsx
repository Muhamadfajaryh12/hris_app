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
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TrainingAPI from "@/data/TrainingAPI";
import { toast } from "sonner";
import CustomAlertDialog from "../CustomAlertDialog";

const categoryOptions = [
  {
    value: "Internal",
  },
  {
    value: "Eksternal",
  },
];

const typeOptions = [
  {
    value: "Workshop",
  },
  {
    value: "On Site",
  },
  {
    value: "Online",
  },
];

const dataFilterSelect = [categoryOptions, typeOptions];

const TrainingComponent = ({ dataTraining }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(dataTraining);
  const columns = [
    {
      id: "npk",
      accessorKey: "user.npk",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
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
      header: "Name",
    },
    {
      id: "position",
      accessorKey: "user.position.position",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Position
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Training",
    },
    {
      id: "type",
      accessorKey: "training_type",
      header: "Type",
    },
    {
      id: "category",
      accessorKey: "training_category",
      header: "Category",
    },
    {
      header: "Action",
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
                <Link href={`/training/form/${row.original.id}`}>Update</Link>
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

              <DropdownMenuItem>
                <Link href={`/training/${row.original.id}`}>View Detail</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id) => {
    const response = await TrainingAPI.DeleteTraining({ id: id });
    if (response.status == 200) {
      toast(response.message);
      setData((prev) => prev.filter((item) => item.id != response.data.id));
    }
  });
  return (
    <div>
      <CustomDataTable
        data={data}
        columns={columns}
        link="/training/form"
        titleButton="Add Training"
        placeholder="Search by name"
        filterSearch="name"
        filterSelect={["category", "type"]}
        dataFilterSelect={dataFilterSelect}
      />
      <CustomAlertDialog
        handleClick={handleDelete}
        id={selectedId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default TrainingComponent;
