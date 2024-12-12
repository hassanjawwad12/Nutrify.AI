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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useNutrientDataStore } from "@/store";
import LayoutLoader from "@/components/layout-loader";
import History from "./advanced/components/History";
import toast from "react-hot-toast";

export function BasicDataTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { NutrientTableData, DeleteNutrients, fetchNutrients } =useNutrientDataStore();
  const [selectedRow, setSelectedRow] = React.useState(null);
  
  const nutrientsData = React.useMemo(() => {
    return [...NutrientTableData.slice().reverse()];
  }, [NutrientTableData]);

  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  const DeleteRow = async (rowData) => {
    const nutrient_id = rowData.id;
    const storedToken = localStorage.getItem("token");
    const response = await DeleteNutrients(storedToken, nutrient_id);

    if (response?.name !== "AxiosError") {
      toast.success("Nutrient deleted successfully!");
      fetchNutrients(storedToken);
    } else {
      toast.error("Failed deleting nutrient");
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <>{row.getValue("id")}</>,
    },

    {
      accessorKey: "item_code",
      header: "Code",
      cell: ({ row }) => {
        return <>{row?.original?.item_code}</>;
      },
    },
    {
      accessorKey: "short_name",
      header: "Abbreviation",
      cell: ({ row }) => {
        return <>{row.original?.short_name}</>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <>{row?.original?.name}</>,
    },
    {
      accessorKey: "unit_symbol",
      header: "Units",
      cell: ({ row }) => <>{row?.original?.unit_symbol}</>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <>{row?.original?.type}</>,
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="flex flex-row gap-1 justify-end">
            <Button onClick={() => handleEditClick(rowData)} type="submit">
              Edit
            </Button>
            <Button
              onClick={() => DeleteRow(rowData)}
              variant="outline"
              color="warning"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data: nutrientsData ?? [],
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

  const [isOpen, setIsOpen] = React.useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      {NutrientTableData ? (
        <>
          <div className="flex items-center flex-wrap gap-2  px-4 mb-12 overflow-x-auto">
            <History
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              closeDialog={closeDialog}
              rowData={selectedRow}
            />

            <Input
              placeholder="Code"
              value={table.getColumn("item_code")?.getFilterValue() || ""}
              type="number"
              onChange={(event) =>
                table.getColumn("item_code")?.setFilterValue(event.target.value)
              }
              className="max-w-sm min-w-[100px] h-12"
            />
            <Input
              placeholder="Abrivation"
              value={table.getColumn("short_name")?.getFilterValue() || ""}
              onChange={(event) =>
                table
                  .getColumn("short_name")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm min-w-[100px] h-12"
            />
            <Input
              placeholder="Name"
              value={table.getColumn("name")?.getFilterValue() || ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm min-w-[100px] h-12"
            />
            <Input
              placeholder="Group"
              value={table.getColumn("group")?.getFilterValue() || ""}
              onChange={(event) =>
                table.getColumn("group")?.setFilterValue(event.target.value)
              }
              className="max-w-sm min-w-[100px] h-12"
            />
            <Input
              placeholder="Unit"
              value={table.getColumn("unit")?.getFilterValue() || ""}
              onChange={(event) =>
                table.getColumn("unit")?.setFilterValue(event.target.value)
              }
              className="max-w-sm min-w-[100px] h-12"
            />
            <Input
              placeholder="Description"
              value={table.getColumn("user.name")?.getFilterValue() || ""}
              onChange={(event) =>
                table.getColumn("user.name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm min-w-[100px] h-12"
            />
          </div>
          <div>
            <Table>
              <TableHeader className="dark:bg-[#161630] dark:text-[#7398FC] bg-white text-black">
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
                      className={`table-row dark:text-[#9D9BC9] text-zinc-800 ${
                        row.index % 2 === 0
                          ? "dark:bg-[#25254C] bg-gray-300"
                          : "dark:bg-[#37375E] bg-white"
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
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
          </div>
          <div className="flex items-center flex-wrap gap-4 px-4 py-4 w-full overflow-x-auto">
            <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex gap-2 w-full justify-center  items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8"
              >
                <Icon
                  icon="heroicons:chevron-left"
                  className="w-5 h-5 rtl:rotate-180"
                />
              </Button>
              {table.getPageOptions().map((page, pageIdx) => (
                <Button
                  key={`basic-data-table-${pageIdx}`}
                  onClick={() => table.setPageIndex(pageIdx)}
                  variant={`${
                    pageIdx === table.getState().pagination.pageIndex
                      ? ""
                      : "outline"
                  }`}
                  className={cn("w-8 h-8")}
                >
                  {page + 1}
                </Button>
              ))}
              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                <Icon
                  icon="heroicons:chevron-right"
                  className="w-5 h-5 rtl:rotate-180"
                />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <LayoutLoader />
      )}
    </>
  );
}
export default BasicDataTable;

/*

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


<div className="md:block hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={openDialog}>
                    History
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <button
              onClick={openDialog}
              className="md:hidden block text-lg font-extrabold text-gray-200"
            >
              ...
            </button> 
*/
