import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useOrderStore } from "@/store/order.store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const order = useOrderStore(
    (state) => state.order
  );

  const updateOrderStatus = useOrderStore(
  (state) => state.updateOrderStatus
);

const [selectedStatus, setSelectedStatus] =
  useState("");

  const isLoading = useOrderStore(
    (state) => state.isLoading
  );

  const error = useOrderStore(
    (state) => state.error
  );

  const fetchOrderById = useOrderStore(
    (state) => state.fetchOrderById
  );

  useEffect(() => {
  if (order) {
    setSelectedStatus(order.status);
  }
}, [order]);

  useEffect(() => {
    if (!id) return;

    fetchOrderById(Number(id));
  }, [id, fetchOrderById]);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading order...
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

  if (!order) {
    return (
      <div className="p-6">
        Order not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Order #{order.id}
          </h1>

          <p className="text-muted-foreground">
            Order details and customer information
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/admin/orders")}
        >
          Back to Orders
        </Button>
      </div>


      {/* Order Summary */}

      <Card>
        <CardHeader>
          <CardTitle>
            Order Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <p className="font-medium">
                {order.user.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {order.user.email}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <Badge>
                {order.status}
              </Badge>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Payment Method
              </p>

              <p className="font-medium">
                {order.paymentMethod}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Total
              </p>

              <p className="text-lg font-semibold">
                ${order.total}
              </p>
            </div>

          </div>


          <Separator />


          <div>
            <p className="text-sm text-muted-foreground">
              Shipping Address
            </p>

            <p className="font-medium">
              {order.shippingAddress}
            </p>
          </div>

        </CardContent>
      </Card>


      {/* Order Items */}

      <Card>
        <CardHeader>
          <CardTitle>
            Order Items
          </CardTitle>
        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>
                  Product
                </TableHead>

                <TableHead>
                  Quantity
                </TableHead>

                <TableHead>
                  Price
                </TableHead>

                <TableHead>
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>

              {order.items.map((item) => (
                <TableRow key={item.id}>

                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>

                  <TableCell>
                    {item.qty}
                  </TableCell>

                  <TableCell>
                    ${item.price}
                  </TableCell>

                  <TableCell>
                    $
                    {Number(item.price) *
                      item.qty}
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </CardContent>
      </Card>


      {/* Update Status */}

      <Card>
        <CardHeader>
          <CardTitle>
            Update Order Status
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="flex items-center gap-4">

            <Select
               value={selectedStatus}
  onValueChange={(value) => {
    setSelectedStatus(value);
  }}
            >

              <SelectTrigger className="w-50">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

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


            <Button
  disabled={
    isLoading ||
    selectedStatus === order.status
  }
  onClick={async () => {
    try {
      await updateOrderStatus(
        order.id,
        selectedStatus
      );
    } catch {
      // store already handles the error
    }
  }}
>
  {isLoading
    ? "Updating..."
    : "Update Status"}
</Button>

          </div>

        </CardContent>
      </Card>

    </div>
  );
}