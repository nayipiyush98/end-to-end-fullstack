import { useState } from "react";
import { MoreHorizontal, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

import type { Category } from "@/zod/category.schema";
import { useCategoryStore } from "@/store/category.store";
import { useNavigate } from "react-router-dom";

interface CategoryActionsProps {
  category: Category;
  onEdit: (category: Category) => void;
}

export function CategoryActions({
  category,
  onEdit,
}: CategoryActionsProps) {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteCategory = useCategoryStore(
    (state) => state.deleteCategory
  );

  const isLoading = useCategoryStore(
    (state) => state.isLoading
  );

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("DELETE CATEGORY ERROR:", error);
    }
  };

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
                Open category actions
              </span>
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigate("/admin/categories/edit/:id")}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isLoading) {
            setDeleteDialogOpen(open);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete category?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{category.name}</strong>?

              <br />

              If this category has products attached,
              the category cannot be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={isLoading}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}