"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Item, SelectValue } from "@radix-ui/react-select";

const CustomDataTable = ({
  columns,
  data,
  filterSearch,
  filterSelect,
  dataFilterSelect,
  link,
  titleButton,
  placeholder,
}) => {
  const [columnFilters, setColumnFilters] = useState();
  const [sorting, setSorting] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
      pagination,
    },
  });

  return (
    <div className="">
      <div className="flex items-center py-4 justify-between gap-2">
        <div className="flex gap-4">
          {filterSearch && (
            <Input
              placeholder={placeholder}
              value={table.getColumn(filterSearch)?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn(filterSearch)
                  ?.setFilterValue(event.target.value)
              }
              className="w-72"
            />
          )}
          {filterSelect?.map((item, index) => (
            <Select
              value={table.getColumn(item)?.getFilterValue() ?? ""}
              onValueChange={(value) => {
                table
                  .getColumn(item)
                  ?.setFilterValue(value == "all" ? "" : value);
              }}
              key={index}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select by ${item} `} />
                <SelectContent>
                  <SelectItem value="all">Select All</SelectItem>
                  {dataFilterSelect[index]?.map((items, index) => (
                    <SelectItem value={items.value} key={index}>
                      {items.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>
          ))}
        </div>
        <Button asChild size="sm">
          <Link href={link}>{titleButton}</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center p-5 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomDataTable;
