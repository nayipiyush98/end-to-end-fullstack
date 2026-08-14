import { createColumnHelper } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { API_HOST } from "@/lib/constants";
import { ProductActions } from "./ProductActions";
import type { Product } from "@/zod/product.schema";
import { type DataTableFeatures } from "./data-table-features"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";




const columnHelper = createColumnHelper<DataTableFeatures,Product>()

export const columns = (
  statusFilter: "all" | "active" | "archived",
  onStatusChange: (
    value: "all" | "active" | "archived"
  ) => void,
   sort: "" | "price_asc" | "price_desc",
  onSortChange: (
    value: "" | "price_asc" | "price_desc"
  )=> void
  
) => {
  return columnHelper.columns([
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
  id: "price",

  header: () => (
    <Select
      value={sort || "none"}
      onValueChange={(value) => {
        const v = value ?? "none";
        onSortChange(
          (v === "none" ? "" : (v as "" | "price_asc" | "price_desc"))
        );
      }}
    >
      <SelectTrigger className="h-8 w-35 border-0 shadow-none">
        <SelectValue placeholder="Price" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="none">
          Price
        </SelectItem>

        <SelectItem value="price_asc">
          Low to High
        </SelectItem>

        <SelectItem value="price_desc">
          High to Low
        </SelectItem>
      </SelectContent>
    </Select>
  ),

  cell: ({ row }) => {
    const price = row.getValue("price") as number;

    return (
      <div className="font-medium">
        ${price.toLocaleString("en-US")}
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
      header: () => (
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            onStatusChange(
              value as "all" | "active" | "archived"
            )
          }
        >
          <SelectTrigger className="h-8 w-30 border-0 shadow-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All
            </SelectItem>

            <SelectItem value="active">
              Active
            </SelectItem>

            <SelectItem value="archived">
              Archived
            </SelectItem>
          </SelectContent>
        </Select>
      ),

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
  header:"Action",
  enableHiding: false,

  cell: ({ row }) => {

    return <ProductActions product={row.original} />;
  },
}),
])

}