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
import { Icon } from "@iconify/react";
import { useSidebarDataStore } from "@/store";
import LayoutLoader from "@/components/layout-loader";
import Edit from "./Components/Edit";
import toast, { Toaster } from "react-hot-toast";

export function BasicDataTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { navData, DeleteFormula, fetchSidebarData } = useSidebarDataStore();

  const FormulasData = React.useMemo(() => {
    return [...navData.slice().reverse()];
  }, [navData]);

  const DeleteRow = async (rowData) => {
    const nutrient_id = rowData.id;
    const storedToken = localStorage.getItem("token");
    const response = await DeleteFormula(storedToken, nutrient_id);
    if (response?.name !== "AxiosError") {
      toast.success("Formula deleted successfully!");
      fetchSidebarData(storedToken);
    } else {
      toast.error("Failed deleting Formula");
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <> {row.getValue("id")}</>,
    },

    {
      accessorKey: "feed_category",
      header: "Feed Category",
      cell: ({ row }) => {
        return <> {row?.original?.feed_category}</>;
      },
    },
    {
      accessorKey: "user_code",
      header: "User Code",
      cell: ({ row }) => {
        return <>{row.original?.user_code}</>;
      },
    },
    {
      accessorKey: "label",
      header: "Label",
      cell: ({ row }) => <> {row?.original?.label}</>,
    },
    {
      accessorKey: "breed",
      header: "Breed",
      cell: ({ row }) => <> {row?.original?.breed}</>,
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => <> {row?.original?.age}</>,
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="flex flex-row gap-1 justify-end">
            <Edit rowData={rowData} />
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
    data: FormulasData ?? [],
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
      {navData ? (
        <>
          <div>
            <Table>
              <TableHeader className="dark:bg-[#161630] bg-white text-black dark:text-[#7398FC]">
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

          <div className="flex w-full items-center flex-wrap gap-4 px-4 py-4 overflow-x-auto">
            <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows?.length} row(s) selected.
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
                  className="w-8 h-8"
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
