import { useEffect, useState } from "react";

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

interface DeleteProductsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onConfirm: () => Promise<void>;
}

export function DeleteProductsDialog2({
  open,
  onOpenChange,
  selectedCount,
  onConfirm,
}: DeleteProductsDialogProps) {
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

 
  useEffect(() => {
    if (!open) {
      setConfirmation("");
      setIsDeleting(false);
    }
  }, [open]);

  const canDelete = confirmation === "DELETE";

  const handleDelete = async () => {
    if (!canDelete || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);

      await onConfirm();

      onOpenChange(false);
    } catch (error) {
      console.error("DELETE PRODUCTS ERROR:", error);
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (isDeleting) {
          return;
        }

        onOpenChange(value);
      }}
    >
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Delete {selectedCount}{" "}
            {selectedCount === 1 ? "product" : "products"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete the selected{" "}
            {selectedCount === 1 ? "product" : "products"}?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Confirmation input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Confirm by typing{" "}
            <span className="font-semibold">"DELETE"</span>:
          </label>

          <input
            value={confirmation}
            onChange={(event) =>
              setConfirmation(event.target.value)
            }
            placeholder='Type "DELETE" to confirm.'
            autoFocus
            disabled={isDeleting}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Warning */}
        <div className="rounded-md border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-semibold text-red-500">
            Warning!
          </p>

          <p className="mt-1 text-sm text-red-500">
            Please be careful, this operation cannot be
            rolled back.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={!canDelete || isDeleting}
            onClick={(event) => {
              // Important:
              // Don't let the normal dialog action
              // automatically close before API finishes.
              event.preventDefault();

              handleDelete();
            }}
            className="bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}