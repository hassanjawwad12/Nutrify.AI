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
import { useRawMaterialDataStore } from "@/store";
import LayoutLoader from "@/components/layout-loader";
import History from "./advanced/components/History";
import toast from "react-hot-toast";

export function BasicDataTable() {
  const { TableData,DeleteIngredients, fetchRawTableData } = useRawMaterialDataStore();
  const [selectedRow, setSelectedRow] = React.useState(null);

  const DeleteRow = async (rowData) => {
    const id = rowData.id;
    const storedToken = localStorage.getItem('token'); 
    const response= await DeleteIngredients(storedToken,id);
    if (response?.name !== "AxiosError") {
      toast.success("Ingredient deleted successfully!");
      fetchRawTableData(storedToken)
    } else {
      toast.error("Failed deleting Ingredient");
    }
  };

  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  const IngredientsData = React.useMemo(() => {
    return [...TableData.slice().reverse()];
    
  }, [TableData]);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <> {row.getValue("id")}</>,
    },

    {
      accessorKey: "item_code",
      header: "Code",
      cell: ({ row }) => {
        return <> {row?.original?.item_code}</>;
      },
    },
    {
      accessorKey: "short_name",
      header: "Abbreviation",
      cell: ({ row }) => {
        return <> {row.original?.short_name}</>;
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
      accessorKey: "common_feed_types",
      header: "Common Feed",
      cell: ({ row }) => <>{row?.original?.common_feed_types}</>,
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
            <Button onClick={()=>DeleteRow(rowData)} variant="outline" color="warning">
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  //export function BasicDataTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: IngredientsData ?? [],
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
      {TableData ? (
        <>
          <div className="flex items-center flex-wrap gap-2  px-4 mb-12 ">
            <History
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              closeDialog={closeDialog}
              rowData={selectedRow}
            />
            <Input
              placeholder="Code"
              value={table.getColumn("item_code")?.getFilterValue() || ""}
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
              value={table.getColumn("units")?.getFilterValue() || ""}
              onChange={(event) =>
                table.getColumn("units")?.setFilterValue(event.target.value)
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
              <TableHeader className="dark:bg-[#161630]  bg-white text-black dark:text-[#7398FC]">
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
          </div>

          <div className="flex items-center flex-wrap gap-4 px-4 py-4 w-full overflow-x-auto">
            <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex gap-2 w-full justify-center items-center">
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
