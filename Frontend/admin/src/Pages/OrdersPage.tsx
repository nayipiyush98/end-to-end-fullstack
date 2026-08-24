import { useEffect } from "react";

import { OrderTable } from "@/components/order/OrderTable";

import { useOrderStore } from "@/store/order.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";


export function Orders() {
    const orders = useOrderStore(
    (state) => state.orders
  );

  const page = useOrderStore(
  (state) => state.page
);

const totalPages = useOrderStore(
  (state) => state.pagination.totalPages
);

const setPage = useOrderStore(
  (state) => state.setPage
);

  const isLoading = useOrderStore(
    (state) => state.isLoading
  );

  const error = useOrderStore(
    (state) => state.error
  );

  const fetchOrders = useOrderStore(
    (state) => state.fetchOrders
  );

  const status = useOrderStore(
  (state) => state.status
);

const setStatus = useOrderStore(
  (state) => state.setStatus
);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  const getPageNumbers = () => {
  const pages: (number | "...")[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (page >= totalPages - 2) {
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
    page - 1,
    page,
    page + 1,
    "...",
    totalPages,
  ];
};
    return (
         <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-semibold">
      Orders
    </h1>

    <p className="text-muted-foreground">
      Manage customer orders.
    </p>
  </div>

  <Select
    value={status || "ALL"}
   onValueChange={(value) => {
  setStatus(
    value === null || value === "ALL"
      ? ""
      : value
  );
}}
  >
    <SelectTrigger className="w-45">
      <SelectValue placeholder="Filter status" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="ALL">
        All Orders
      </SelectItem>

      <SelectItem value="PENDING">
        Pending
      </SelectItem>

      <SelectItem value="SHIPPED">
        Shipped
      </SelectItem>

      <SelectItem value="DELIVERED">
        Delivered
      </SelectItem>

      <SelectItem value="CANCELLED">
        Cancelled
      </SelectItem>
    </SelectContent>
  </Select>
</div>
      

      <OrderTable orders={orders} />
  <div className="flex mt-4">
  <p className="text-sm font-medium pt-2 pr-10">
    Page {page} of {totalPages}
  </p>

  <div className="flex items-center gap-2">
    {/* First */}
    <Button
      variant="outline"
      size="icon"
      disabled={page === 1 || isLoading}
      onClick={() => setPage(1)}
    >
      <ChevronsLeft className="h-4 w-4" />
    </Button>

    {/* Previous */}
    <Button
      variant="outline"
      size="icon"
      disabled={page === 1 || isLoading}
      onClick={() => setPage(page - 1)}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>

    {/* Page numbers */}
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

      const isCurrent = pageNumber === page;

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

    {/* Next */}
    <Button
      variant="outline"
      size="icon"
      disabled={page === totalPages || isLoading}
      onClick={() => setPage(page + 1)}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>

    {/* Last */}
    <Button
      variant="outline"
      size="icon"
      disabled={page === totalPages || isLoading}
      onClick={() => setPage(totalPages)}
    >
      <ChevronsRight className="h-4 w-4" />
    </Button>
  </div>
</div>
    </div>
    
    )
}