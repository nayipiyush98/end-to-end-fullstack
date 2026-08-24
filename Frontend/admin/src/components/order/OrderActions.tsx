import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Order } from "@/zod/order.schema";

interface OrderActionsProps {
  order: Order;
}

export function OrderActions({
  order,
}: OrderActionsProps) {
  const navigate = useNavigate();

  return (
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
              Open order actions
            </span>
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            navigate(`/admin/orders/${order.id}`)
          }
        >
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            navigate(`/admin/orders/${order.id}/status`)
          }
        >
          Update Status
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            console.log("Cancel order:", order.id)
          }
        >
          Cancel Order
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            console.log("Download invoice:", order.id)
          }
        >
          Download Invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}