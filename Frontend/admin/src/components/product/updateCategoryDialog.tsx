import { useEffect, useState } from "react";
import type { Category } from "@/zod/category.schema";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: number;
  name: string;
}

interface UpdateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  categories: Category[];
  onConfirm: (categoryId: number) => Promise<void>;
}

export function UpdateCategoryDialog({
  open,
  onOpenChange,
  selectedCount,
  categories,
  onConfirm,
}: UpdateCategoryDialogProps) {
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setCategoryId("");
      setIsSubmitting(false);
    }
  }, [open]);

  const handleConfirm = async () => {
    if (!categoryId) return;

    try {
      setIsSubmitting(true);

      await onConfirm(Number(categoryId));

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!isSubmitting) {
          onOpenChange(value);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Update category
          </AlertDialogTitle>

          <AlertDialogDescription>
            Update the category for {selectedCount} selected
            {selectedCount === 1 ? " product" : " products"}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Select
          value={categoryId}
          onValueChange={setCategoryId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
          {categories.length === 0 ? (
  <div className="p-2 text-sm text-muted-foreground">
    No categories found.
  </div>
) : (
  categories.map((category) => (
    <SelectItem
      key={category.id}
      value={String(category.id)}
    >
      {category.name}
    </SelectItem>
  ))
)}          </SelectContent>
        </Select>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={!categoryId || isSubmitting}
            onClick={(event) => {
              event.preventDefault();
              handleConfirm();
            }}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}