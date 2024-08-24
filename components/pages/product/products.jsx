"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/shared/customImage";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const Products = ({ productsData, categorys, topProductsData }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  // Paginated Data
  const paginatedData = useMemo(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    return productsData.slice(start, end);
  }, [page, pageSize, productsData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => `${info.getValue()}000 сум`,
        enableSorting: true,
      },
    ],
    []
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    pageCount: Math.ceil(productsData.length / pageSize),
    state: {
      pagination: {
        pageIndex: page,
        pageSize: pageSize,
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex: page, pageSize });
        setPage(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        const { pageIndex, pageSize } = updater;
        setPage(pageIndex);
        setPageSize(pageSize);
      }
    },
  });

  return (
    <div className="col-span-3 space-y-4">
      <div className="flex justify-between md:justify-end items-center">
        {/* Category Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-auto">
              <button className="flex gap-3 max-md:bg-white bg-secondary px-2 py-1 outline-none rounded-md justify-between">
                <h1>Категории</h1> <ChevronDown className="w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categorys.map((item, idx) => (
                <DropdownMenuItem asChild key={idx}>
                  <Link href={`/${item.topCategoryId}/${item.id}`} key={idx}>
                    <h1>{item.name}</h1>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Price Sorting Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex gap-3 max-md:bg-white bg-secondary px-2 text-xs lg:text-base py-1 outline-none rounded-md justify-between">
              <h1>Цена</h1> <ChevronDown className="size-4 lg:size-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button
                onClick={() => table.setSorting([{ id: "price", desc: false }])}
                className="flex justify-between text-xs lg:text-base items-center gap-2"
              >
                <ArrowUp className="size-4 lg:size-6" />
                По возр.
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => table.setSorting([{ id: "price", desc: true }])}
                className="flex justify-between text-xs lg:text-base items-center gap-2"
              >
                <ArrowDown className="size-4 lg:size-6" />
                По убыв.
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {table.getRowModel().rows.map((row) => {
          const item = row.original;
          console.log(item.image);
          return (
            <Link
              href={`/${topProductsData[0].id}/${item.categoryId}/${item.id}`}
              key={item.id}
              className="relative w-full flex max-md:bg-secondary rounded-md flex-col gap-4 p-5"
            >
              <div className="relative max-md:bg-white rounded-md max-md:p-2">
                <CustomImage
                  src={`${item.image[0]}`}
                  alt={`${item.name}`}
                  className={"aspect-square h-[200px] w-full"}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h1 className="font-bold textNormal2">{item.name}</h1>
                <p className="flex justify-between w-full">
                  Цена:<span>{item.price}000 сум</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          {Array.from({ length: table.getPageCount() }).map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                onClick={() => table.setPageIndex(idx)}
                active={
                  idx === table.getState().pagination.pageIndex
                    ? "true"
                    : undefined
                }
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Products;