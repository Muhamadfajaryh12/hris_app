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
import React, { useCallback, useState } from "react";
import Badge from "../Badge";
import SectionCard from "../SectionCard";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import OvertimeAPI from "@/data/OvertimeAPI";
import { toast } from "sonner";
const OvertimeComponent = ({ dataOvertime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(dataOvertime.data);
  const [count, setCount] = useState(dataOvertime.status_count);
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
      id: "date",
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p>{useFormattedDate(row.original.date)}</p>;
      },
    },
    {
      id: "overtime_duration",
      accessorKey: "overtime_duration",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Overtime Duration
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      id: "break_duration",
      accessorKey: "break_duration",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Break Duration
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      id: "shift",
      accessorKey: "shift.title",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Shift
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      accessorKey: "user.position.position",
      header: "Position",
    },
    {
      header: "Status",
      id: "status",
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
                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedId(row.original.id);
                    }}
                  >
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

  const handleDelete = useCallback(async (id) => {
    const response = await OvertimeAPI.DeleteOvertime({ id: id });
    if (response.status == 200) {
      toast(response.message);
      setData((prev) => prev.filter((item) => item.id !== response.data.id));
      setCount((prev) =>
        prev.map((item) =>
          item.approval_leader == "Waiting"
            ? {
                ...item,
                count: item.count - 1,
              }
            : item
        )
      );
    }
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {count.map((item, index) => (
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
        data={data}
        link={"/overtime/form"}
        titleButton="Request Overtime"
        filterSearch="name"
        filterSelect={["status"]}
        dataFilterSelect={[dataFilterSelect]}
        placeholder="Search by name"
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

export default OvertimeComponent;
