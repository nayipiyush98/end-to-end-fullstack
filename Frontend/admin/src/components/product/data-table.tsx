import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table";
import * as React from "react";
import { ProductToolbar } from "./product-toolbar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";

interface DataTableProps<TData extends RowData> {
  columns: (
    statusFilter: "all" | "active" | "archived",
    onStatusChange: (
      value: "all" | "active" | "archived"
    ) => void
  ) => ColumnDef<DataTableFeatures, TData>[];

  data: TData[];

  statusFilter: "all" | "active" | "archived";

  onStatusChange: (
    value: "all" | "active" | "archived"
  ) => void;

  rowSelection: RowSelectionState;

  onRowSelectionChange: (
    updater:
      | RowSelectionState
      | ((old: RowSelectionState) => RowSelectionState)
  ) => void;

  search: string;

  onSearchChange: (value: string) => void;

  onReset: () => void;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  search,
  rowSelection,
  onRowSelectionChange,
  onSearchChange,
  onReset,
  statusFilter,
  onStatusChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});


  const tableColumns = React.useMemo(
    () => columns(statusFilter, onStatusChange),
    [columns, statusFilter, onStatusChange]
  );

  const table = useTable({
    features,

    data,

    columns: tableColumns,

    getRowId: (row) => {
      return String(
        (row as TData & { id: number }).id
      );
    },

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,

    onRowSelectionChange,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <ProductToolbar
        search={search}
        onSearchChange={onSearchChange}
        onReset={onReset}
        table={table}
      />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    row.getIsSelected() && "selected"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}