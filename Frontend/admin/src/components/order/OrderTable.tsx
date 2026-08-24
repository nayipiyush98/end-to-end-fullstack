import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActions } from "./OrderActions";

import type { Order } from "@/zod/order.schema";

interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({
  orders,
}: OrderTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>

            <TableHead>Customer</TableHead>

            <TableHead>Items</TableHead>

            <TableHead>Total</TableHead>

            <TableHead>Payment</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Date</TableHead>

            <TableHead>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center"
              >
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                {/* Order ID */}
                <TableCell className="font-medium">
                  #{order.id}
                </TableCell>

            
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {order.user.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {order.user.email}
                    </p>
                  </div>
                </TableCell>

          
                <TableCell>
                  {order.items.reduce(
                    (total, item) =>
                      total + item.qty,
                    0
                  )}
                </TableCell>

                <TableCell>
                  ${Number(order.total).toFixed(2)}
                </TableCell>

               
                <TableCell>
                  {order.paymentMethod}
                </TableCell>

               
                <TableCell>
                   <OrderStatusBadge status={order.status} />
                </TableCell>

             
                <TableCell>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </TableCell>

               
               <TableCell>
  <OrderActions order={order} />
</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}