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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


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
        value === "ALL" ? "" : value
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
      {totalPages > 1 && (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={(event) => {
            event.preventDefault();

            if (page > 1) {
              setPage(page - 1);
            }
          }}
          className={
            page === 1
              ? "pointer-events-none opacity-50"
              : ""
          }
        />
      </PaginationItem>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((pageNumber) => (
        <PaginationItem key={pageNumber}>
          <button
            type="button"
            onClick={() =>
              setPage(pageNumber)
            }
            className={`px-3 py-2 text-sm ${
              page === pageNumber
                ? "font-semibold"
                : ""
            }`}
          >
            {pageNumber}
          </button>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(event) => {
            event.preventDefault();

            if (page < totalPages) {
              setPage(page + 1);
            }
          }}
          className={
            page === totalPages
              ? "pointer-events-none opacity-50"
              : ""
          }
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)}
    </div>
    
    )
}