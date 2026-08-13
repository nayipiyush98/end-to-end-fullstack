import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";

interface UpdateStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onConfirm: (stock: number) => Promise<void>;
}

export function UpdateStockDialog({
  open,
  onOpenChange,
  selectedCount,
  onConfirm,
}: UpdateStockDialogProps) {
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const value = Number(stock);

    if (!Number.isInteger(value) || value < 0) {
      return;
    }

    try {
      setLoading(true);

      await onConfirm(value);

      setStock("");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Update stock
          </AlertDialogTitle>

          <AlertDialogDescription>
            Set the stock for{" "}
            <strong>{selectedCount}</strong>{" "}
            selected product
            {selectedCount !== 1 && "s"}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          type="number"
          min="0"
          placeholder="Enter stock"
          value={stock}
          onChange={(event) =>
            setStock(event.target.value)
          }
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading || stock === ""}
            onClick={(event) => {
              event.preventDefault();
              handleConfirm();
            }}
          >
            {loading ? "Updating..." : "Update Stock"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}