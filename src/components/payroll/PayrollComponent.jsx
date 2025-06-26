"use client";
import React, { useState } from "react";
import CustomDataTable from "../CustomDataTable";
import { useCurrency } from "@/hooks/useCurrency";
import Badge from "../Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import CustomAlertDialog from "../CustomAlertDialog";
import PayRollAPI from "@/data/PayRollAPI";
import { toast } from "sonner";
const PayrollComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();

  const handleClick = async (value) => {
    const response = await PayRollAPI.UpdatePayRoll({
      id: value,
      status: "Paid",
    });
    if (response.status == 200) {
      toast("Success");
    }
  };
  const columns = [
    {
      accessorKey: "employee.npk",
      header: "NPK",
    },
    {
      id: "name",
      accessorKey: "employee.name",
      header: "Name",
    },
    {
      id: "periode",
      header: "Periode",
      accessorFn: (row) => `${row.period_month} - ${row.period_year}`,
      cell: ({ row }) => {
        return (
          <p>
            {row.original?.period_month} - {row.original?.period_year}
          </p>
        );
      },
    },
    {
      header: "Deduction BPJS",
      cell: ({ row }) => {
        return (
          <div className="p-2 w-auto bg-red-200 border border-red-600 text-red-800 rounded-sm">
            <p>{useCurrency(row.original?.deduction_bpjs)}</p>
          </div>
        );
      },
    },
    {
      header: "Deduction PPH",
      cell: ({ row }) => {
        return (
          <div className="p-2 w-auto bg-red-200 border border-red-600 text-red-800 rounded-sm">
            <p>{useCurrency(row.original?.deduction_pph)}</p>
          </div>
        );
      },
    },
    {
      header: "Deduction Leave",
      cell: ({ row }) => {
        return (
          <div className="p-2 w-auto bg-red-200 border border-red-600 text-red-800 rounded-sm">
            <p>{useCurrency(row.original?.deduction_attendence)}</p>
          </div>
        );
      },
    },
    {
      header: "Bonus",
      cell: ({ row }) => {
        return (
          <div className="p-2 w-auto bg-green-200 border border-green-600 text-green-800 rounded-sm">
            <p>{useCurrency(row.original?.bonus)}</p>
          </div>
        );
      },
    },
    {
      header: "Bonus Overtime",
      cell: ({ row }) => {
        return (
          <div className="p-2 w-auto bg-green-200 border border-green-600 text-green-800 rounded-sm">
            <p>{useCurrency(row.original?.bonus_overtime)}</p>
          </div>
        );
      },
    },
    {
      header: "Total Salary",
      cell: ({ row }) => {
        return (
          <div className="p-2 w-auto bg-blue-200 border border-blue-600 text-blue-800 rounded-sm">
            <p>{useCurrency(row.original?.total_salary)}</p>
          </div>
        );
      },
    },
    {
      header: "Status",
      cell: ({ row }) => {
        return <Badge status={row?.original?.status} />;
      },
    },
    {
      header: "",
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
              {row.original.status == "Paid" ? (
                <div className="">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/payroll/${row.original.id}`}>
                      View Salary slip
                    </Link>
                  </DropdownMenuItem>
                </div>
              ) : (
                <div className="">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/payroll/form/${row.original.id}`}>
                      Update
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpen(true), setId(row.original.id);
                    }}
                  >
                    Payment
                  </DropdownMenuItem>
                </div>
              )}
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
        link={"/payroll/form"}
        titleButton="Add Payroll"
        placeholder="Search by name"
        filterColumn={"name"}
        filterColumn2={"periode"}
      />

      <CustomAlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClick={handleClick}
        id={id}
      />
    </div>
  );
};

export default PayrollComponent;
