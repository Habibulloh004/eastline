/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../shared/dataTableColumnHeader";
import DeleteItem from "../pages/dashboard/deleteItems";

export const topCategory = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название товара" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DeleteItem payment={row.original} />,
  },
];
