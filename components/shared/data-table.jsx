"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./dataTablePagination";
import { DataTableViewOptions } from "./dataTableViewOptions";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";
import { ColumnFiltersState, SortingFn, FilterFn } from "@tanstack/react-table";
import { formatFullDate, truncateText } from "@/lib/utils";
import axios from "axios";
import CustomImage from "./customImage";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Custom fuzzy filter and sorting functions
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export function DataTable({ columns, data }) {
  const router = useRouter();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [topCategories, setTopCategories] = useState([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // initialState: {
    //   pagination: {
    //     pageSize: 5, // Set default page size to 5
    //   },
    // },
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/topCategory`);
      setTopCategories(data.data);
    }

    fetchData();
  }, []);

  // Ensure sorting when fuzzy filtering by fullName
  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <>
      <div className="flex items-center gap-3 py-4">
        <Button variant="outline" className="text-xs lg:text-base" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 size-4 lg:size-6" /> Назад
        </Button>

        <Input
          placeholder="Поиск по всем столбцам..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          className="max-w-[250px]"
        />
        <DataTableViewOptions table={table} />
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
                  {row.getVisibleCells().map((cell) => {
                    // console.log(cell.column);
                    const findTopCategoryName =
                      cell.column.columnDef.accessorKey == "topCategoryId" &&
                      topCategories.find((item) => item.id == cell.getValue());
                    return (
                      <TableCell key={cell.id}>
                        {cell.column.columnDef.accessorKey == "createdAt" ? (
                          formatFullDate(cell.getValue())
                        ) : cell.column.columnDef.accessorKey ==
                          "topCategoryId" ? (
                          findTopCategoryName?.name
                        ) : cell.column.columnDef.accessorKey == "feature" ? (
                          truncateText(cell.getValue(), 10)
                        ) : cell.column.columnDef.accessorKey == "brand" ? (
                          truncateText(cell.getValue(), 15)
                        ) : cell.column.columnDef.accessorKey == "price" ? (
                          `${cell.getValue()}$`
                        ) : cell.column.columnDef.accessorKey == "image" ? (
                          <CustomImage
                            src={`${cell.getValue()}`}
                            alt={`${cell.getValue()}`}
                          />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
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
                  Нет результатов.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 p-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </>
  );
}
