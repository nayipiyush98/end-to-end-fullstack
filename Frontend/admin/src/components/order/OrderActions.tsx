import { useState } from "react";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { downloadInvoice } from "@/api/order.api";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Order } from "@/zod/order.schema";
import { useOrderStore } from "@/store/order.store";

interface OrderActionsProps {
  order: Order;
  onView: (order: Order) => void;
}

export function OrderActions({
  order,
  onView,
}: OrderActionsProps) {
  const [statusDialogOpen, setStatusDialogOpen] =
    useState(false);

    const [isDownloadingInvoice, setIsDownloadingInvoice] =
  useState(false);

  const [selectedStatus, setSelectedStatus] =
    useState(order.status);

  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );

  const isLoading = useOrderStore(
    (state) => state.isLoading
  );

  const error = useOrderStore(
    (state) => state.error
  );

  const clearError = useOrderStore(
    (state) => state.clearError
  );

  const handleOpenStatusDialog = () => {
    clearError();
    setSelectedStatus(order.status);
    setStatusDialogOpen(true);
  };

  const handleDownloadInvoice = async () => {
  try {
    setIsDownloadingInvoice(true);

    const blob = await downloadInvoice(order.id);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `invoice-order-${order.id}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "DOWNLOAD INVOICE ERROR:",
      error
    );
  } finally {
    setIsDownloadingInvoice(false);
  }
};

  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatus(
        order.id,
        selectedStatus
      );

      setStatusDialogOpen(false);
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error
      );
    }
  };

  const [cancelDialogOpen, setCancelDialogOpen] =
  useState(false);

const [cancelReason, setCancelReason] =
  useState("");

  const cancelOrder = useOrderStore(
  (state) => state.cancelOrder
);

  return (
    <>
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
            onClick={() => onView(order)}
          >
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
  disabled={isDownloadingInvoice}
  onClick={handleDownloadInvoice}
>
  {isDownloadingInvoice ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Downloading...
    </>
  ) : (
    <>
      
      Download Invoice
    </>
  )}
</DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleOpenStatusDialog}
          >
            Update Status
          </DropdownMenuItem>
          <DropdownMenuItem
  disabled={
    order.status === "SHIPPED" ||
    order.status === "DELIVERED" ||
    order.status === "CANCELLED"
  }
  onClick={() => {
    clearError();
    setCancelReason("");
    setCancelDialogOpen(true);
  }}
>
  Cancel Order
</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
  open={cancelDialogOpen}
  onOpenChange={(open) => {
    if (!isLoading) {
      setCancelDialogOpen(open);
    }
  }}
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Cancel Order
      </DialogTitle>

      <DialogDescription>
        Are you sure you want to cancel order #
        {order.id}?
      </DialogDescription>
    </DialogHeader>

    <div className="py-4">
      <label className="mb-2 block text-sm font-medium">
        Cancellation reason
      </label>

      <textarea
        value={cancelReason}
        onChange={(event) =>
          setCancelReason(event.target.value)
        }
        placeholder="Enter cancellation reason..."
        className="min-h-24 w-full rounded-md border px-3 py-2 text-sm"
      />

      {error && (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>

    <DialogFooter>
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() =>
          setCancelDialogOpen(false)
        }
      >
        Close
      </Button>

      <Button
        variant="destructive"
        disabled={
          isLoading ||
          !cancelReason.trim()
        }
        onClick={async () => {
          try {
            await cancelOrder(
              order.id,
              cancelReason.trim()
            );

            setCancelDialogOpen(false);
          } catch (error) {
            console.error(
              "CANCEL ORDER ERROR:",
              error
            );
          }
        }}
      >
        {isLoading
          ? "Cancelling..."
          : "Cancel Order"}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      <Dialog
        open={statusDialogOpen}
        onOpenChange={(open) => {
          if (!isLoading) {
            setStatusDialogOpen(open);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update Order Status
            </DialogTitle>

            <DialogDescription>
              Update the status of order #{order.id}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus(value);
              }}
            >
              <SelectTrigger className="w-full">
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

            {error && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() =>
                setStatusDialogOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              disabled={
                isLoading ||
                selectedStatus === order.status
              }
              onClick={handleUpdateStatus}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}