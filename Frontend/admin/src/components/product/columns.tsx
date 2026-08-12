

import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { API_HOST } from "@/lib/constants";
import { useState } from "react";
import { DeleteProductDialog } from "./deletePorductDialog";
import { useProductStore } from "@/store/product.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Product } from "@/zod/product.schema";
import { type DataTableFeatures } from "./data-table-features"



const columnHelper = createColumnHelper<DataTableFeatures,Product>()

export const columns = columnHelper.columns([
    columnHelper.display({
    id: "select",
    header: ({ table }) => (
       <Checkbox
  checked={table.getIsAllPageRowsSelected()}
  onCheckedChange={(value) =>
    table.toggleAllPageRowsSelected(!!value)
  }
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
  }),
  columnHelper.display({
    id:"image",
    header:"Image",
    cell:({ row }) =>{
         const product = row.original;

         const image = product.images?.[0];

          if (!image) {
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-md border text-xs">
            No image
          </div>
        );
      }
       return (
        <img
          src={`${API_HOST}${image}`}
          alt={product.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      );
    }
  }),
  columnHelper.accessor("name", {
     header:"Name",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("name")}
      </div>
    ),
  }),
    columnHelper.accessor("sku",{
    header:"SKU",
    cell: ({ row }) => (
        <div className="font-mono text-sm">
            {row.getValue("sku")}
        </div>
    ),
}),
    columnHelper.accessor("category.name", {
    id: "category",
    header: "Category",

    cell: ({ row }) => (
      <div>
        {row.original.category.name}
      </div>
    ),
  }),
   columnHelper.accessor("price", {
  header: "Price",

  cell: ({ row }) => {
    const price = row.getValue("price") as number;

    return (
      <div className="font-medium">
        ₹{price.toLocaleString("en-IN")}
      </div>
    );
  },
}),
  columnHelper.accessor("stock", {
  header: "Stock",

  cell: ({ row }) => {
    const stock = row.original.stock;

    return (
      <div
        className={
          stock <= 5
            ? "font-medium text-red-500"
            : "font-medium"
        }
      >
        {stock}
      </div>
    );
  },
}),
   columnHelper.accessor("isArchived", {
    header: "Status",

    cell: ({ row }) => {
      const isArchived = row.getValue("isArchived");

      return (
        <span
          className={
            isArchived
              ? "text-sm text-red-500"
              : "text-sm text-green-600"
          }
        >
          {isArchived ? "Archived" : "Active"}
        </span>
      );
    },
  }),
columnHelper.display({
  id: "actions",
  enableHiding: false,

  cell: ({ row }) => {
    const product = row.original;

    return <ProductActions product={product} />;
  },
}),
])

function ProductActions({ product }: { product: Product }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteProduct = useProductStore(
    (state) => state.deleteProduct
  );

  const isLoading = useProductStore(
    (state) => state.isLoading
  );

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);

      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <MoreHorizontal className="h-4 w-4" />

              <span className="sr-only">
                Open actions
              </span>
            </Button>
          }
        />

        <DropdownMenuContent align="end">

          <DropdownMenuItem
            onClick={() => {
              console.log("Edit product:", product.id);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-400"
            onClick={() => {
              setDeleteDialogOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        productName={product.name}
        onConfirm={handleDelete}
        isDeleting={isLoading}
      />
    </>
  );
}