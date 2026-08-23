import { Badge } from "@/components/ui/badge";

import type { Order } from "@/zod/order.schema";

interface OrderStatusBadgeProps {
  status: Order["status"];
}

export function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="secondary">
          Pending
        </Badge>
      );

    case "SHIPPED":
      return (
        <Badge>
          Shipped
        </Badge>
      );

    case "DELIVERED":
      return (
        <Badge className="bg-green-600 hover:bg-green-600">
          Delivered
        </Badge>
      );

    case "CANCELLED":
      return (
        <Badge variant="destructive">
          Cancelled
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}