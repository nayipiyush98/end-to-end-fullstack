import { useEffect, useState } from "react";

import { DataTable } from "@/components/product/data-table";
import { columns } from "@/components/product/columns";
import { useProductStore } from "@/store/product.store";
import { Button } from "../components/ui/button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Products() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const pagination = useProductStore((state) => state.pagination);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const getPageNumbers = () => {
    if (!pagination) return [];

    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    fetchProducts({
      page,
      limit,
      search: debouncedSearch || undefined,
    });
  }, [debouncedSearch, limit, page, fetchProducts]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>

        <p className="text-muted-foreground">
          Manage your products and inventory.
        </p>
      </div>
      <DataTable
        columns={columns}
        data={products}
        search={search}
        onSearchChange={setSearch}
        onReset={() => {
          setSearch("");
          setDebouncedSearch("");
          setPage(1);
        }}
      />
      <div className="mt-6 flex items-center justify-between">
        <div className="flex">
          <span className="text-sm pt-1 pr-1">Rows Per Page</span>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-17">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          <p className="text-sm font-medium pt-2 pr-10">
            Page {pagination?.page ?? 1} of {pagination?.totalPages ?? 1}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!pagination?.hasPreviousPage || isLoading}
              onClick={() => setPage(1)}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!pagination?.hasPreviousPage || isLoading}
              onClick={() => setPage((current) => current - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {getPageNumbers().map((pageNumber, index) => {
              if (pageNumber === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-muted-foreground"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = pageNumber === pagination?.page;

              return (
                <Button
                  key={pageNumber}
                  variant={isCurrent ? "default" : "outline"}
                  size="icon"
                  disabled={isLoading}
                  onClick={() => setPage(pageNumber as number)}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              disabled={!pagination?.hasNextPage || isLoading}
              onClick={() => setPage((current) => current + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!pagination?.hasNextPage || isLoading}
              onClick={() => setPage(pagination?.totalPages ?? 1)}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
