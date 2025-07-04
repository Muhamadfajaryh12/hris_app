"use client";
import React, { useCallback, useState } from "react";
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Badge from "../Badge";
import SectionCard from "../SectionCard";
import { useFormattedDate } from "@/hooks/useFormattedDate";
import AnnualLeaveAPI from "@/data/AnnualLeaveAPI";
import { toast } from "sonner";
import CustomAlertDialog from "../CustomAlertDialog";

const RequestLeaveComponent = ({ dataLeave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(dataLeave.data);
  const [count, setCount] = useState(dataLeave.status_count);
  console.log(count);
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
      header: "Employee",
    },
    {
      accessorKey: "user.position.position",
      header: "Position",
    },
    {
      id: "type",
      accessorKey: "type",
      header: "Type",
    },
    {
      header: "Date Leave",
      id: "date",
      cell: ({ row }) => {
        return (
          <p>
            {useFormattedDate(row.original.date_start)} -{" "}
            {useFormattedDate(row.original.date_end)}
          </p>
        );
      },
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
      id: "status",
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <Badge status={row?.original?.status} />;
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
              {row.original?.status == "Waiting" ? (
                <>
                  <DropdownMenuItem>
                    <Link href={`/request_leave/form/${row.original.id}`}>
                      Update
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/request_leave/${row.original.id}`}>
                      Approval
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
                <DropdownMenuItem>
                  <Link href={`/request_leave/${row.original.id}`}>
                    View request
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const typeOptions = [
    {
      value: "Annual Leave",
    },
    {
      value: "Sick Leave",
    },
    {
      value: "Maternity Leave",
    },
    {
      value: "Bereavement Leave",
    },
    {
      value: "Compensation Leave",
    },
  ];

  const statusOptions = [
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
  const dataFilterSelect = [typeOptions, statusOptions];

  const handleDelete = useCallback(async (id) => {
    const response = await AnnualLeaveAPI.DeleteAnnualLeave({ id: id });
    if (response.status == 200) {
      toast(response.message);
      setData((prev) => prev.filter((item) => item.id != response.data.id));
      setCount((prev) =>
        prev.map((item) =>
          item.status == "Waiting"
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
        {count?.map((item, index) => (
          <SectionCard
            title={item.status}
            count={item.count}
            key={index}
            styleCard={
              item.status === "Waiting"
                ? "bg-blue-100 border-blue-300 text-blue-800"
                : item.status === "Rejected"
                ? "bg-red-100 border-red-300 text-red-800"
                : item.status === "Approved"
                ? "bg-green-100 border-green-300 text-green-800"
                : ""
            }
          />
        ))}
      </div>
      <CustomDataTable
        data={data}
        columns={columns}
        link={"/request_leave/form"}
        titleButton="Request leave"
        filterSearch="name"
        placeholder="Search by name"
        filterSelect={["type", "status"]}
        dataFilterSelect={dataFilterSelect}
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

export default RequestLeaveComponent;
