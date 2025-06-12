"use client";
import React from "react";
import CustomDataTable from "../CustomDataTable";

const RequestLeaveComponent = ({ data }) => {
  const columns = [
    {
      header: "Date",
      id: "date",
      cell: ({ row }) => {
        return (
          <p>{new Date(row?.original?.date_leave).toLocaleDateString()}</p>
        );
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      header: "Approval HRD",
      id: "approval_hrd",
      enableHiding: false,
      cell: ({ row }) => {
        if (row.original.approval_hrd === null)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-blue-500 w-24 text-center ">
              Waiting
            </div>
          );
        if (row.original.approval_hrd === true)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-green-500 w-24 text-center ">
              Approved
            </div>
          );
        if (row.original.approval_hrd === false)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-red-500 w-24 text-center ">
              Rejected
            </div>
          );
      },
    },
    {
      header: "Approval Leader",
      id: "approval_leader",
      enableHiding: false,
      cell: ({ row }) => {
        if (row.original.approval_leader === null)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-blue-500 w-24 text-center ">
              Waiting
            </div>
          );
        if (row.original.approval_leader === true)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-green-500 w-24 text-center ">
              Approved
            </div>
          );
        if (row.original.approval_leader === false)
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-red-500 w-24 text-center ">
              Rejected
            </div>
          );
      },
    },
    {
      header: "Status",
      id: "status",
      enableHiding: false,
      cell: ({ row }) => {
        if (row.original.status === "Pending")
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-blue-500 w-24 text-center ">
              Waiting
            </div>
          );
        if (row.original.status === "Approved")
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-green-500 w-24 text-center ">
              Approved
            </div>
          );
        if (row.original.status === "Rejected")
          return (
            <div className="p-2 text-xs text-white font-semibold rounded-sm bg-red-500 w-24 text-center ">
              Rejected
            </div>
          );
      },
    },
  ];
  return <CustomDataTable data={data} columns={columns} />;
};

export default RequestLeaveComponent;
