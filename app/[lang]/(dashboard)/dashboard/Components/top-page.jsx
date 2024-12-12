"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "./data";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const columns = [
  {
    accessorKey: "page",
    header: "Optimization nutrients",
    cell: ({ row }) => (
      <div className="flex gap-4">
        {/* <span className="text-default-600">{row.getValue("id")}</span> */}
        <span>{row.getValue("page")}</span>
      </div>
    ),
  },
  {
    accessorKey: "post",
    header: "Min %",
    cell: ({ row }) => (
      <div className="truncate max-w-[200px] col-1">{row.getValue("post")}</div>
    ),
  },
  {
    accessorKey: "count",
    header: "Max %",
    cell: ({ row }) => (
      <div className="mr-0 gap-1 ">
        <span className="col-2"> {row.getValue("count")}</span>
      </div>
    ),
  },
  
];

const TopPage = () => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-default-300">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={`toppage-headerGroup-${index}`}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={`toppage-header-${index}`}
                      className="text-sm font-semibold text-default-600 bg-default-200 h-12 last:text-end last:pr-7"
                    >
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
          <TableBody className="[&_tr:last-child]:border-1">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={`toppage-row-${index}`}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-default-50"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={`toppage-cell-${index}`}
                      className="text-sm text-default-700 border-b border-default-100 dark:border-default-200  last:text-end last:pr-6"
                    >
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
                  className="h-12 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap gap-2  justify-center mt-4">
        <Button
          size="icon"
          className="h-7 w-7 bg-default-100 text-default-600 hover:text-primary-foreground"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon
            icon="heroicons:chevron-left"
            className="w-3.5 h-3.5 rtl:rotate-180"
          />
        </Button>
        <ul className=" flex space-x-3 rtl:space-x-reverse items-center">
          {table.getPageOptions().map((page, pageIndex) => (
            <li key={pageIndex}>
              <Button
                onClick={() => table.setPageIndex(pageIndex)}
                aria-current="page"
                className={cn(
                  "h-7 w-7 bg-default-100 text-default-600 p-0 hover:bg-opacity-70 hover:text-primary-foreground",
                  {
                    "bg-primary text-primary-foreground":
                      pageIndex === table.getState().pagination.pageIndex,
                  }
                )}
              >
                {page + 1}
              </Button>
            </li>
          ))}
        </ul>

        <Button
          size="icon"
          className="h-7 w-7 bg-default-100 text-default-600 hover:text-primary-foreground"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Icon
            icon="heroicons:chevron-right"
            className="w-3.5 h-3.5 rtl:rotate-180"
          />
        </Button>
      </div>
    </>
  );
};

export default TopPage;
