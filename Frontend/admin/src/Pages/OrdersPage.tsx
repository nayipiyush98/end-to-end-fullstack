import { useEffect } from "react";

import { OrderTable } from "@/components/order/OrderTable";

import { useOrderStore } from "@/store/order.store";



export function Orders() {
    const orders = useOrderStore(
    (state) => state.orders
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
      <div>
        <h1 className="text-2xl font-semibold">
          Orders
        </h1>

        <p className="text-muted-foreground">
          Manage customer orders.
        </p>
      </div>

      <OrderTable orders={orders} />
    </div>
    )
}