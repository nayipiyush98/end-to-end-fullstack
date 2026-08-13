import { PackagePlus, Tags, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";

interface ProductBulkActionsProps {
  selectedCount: number;
  onClear: () => void;
  onDelete: () => void;
  onUpdateStock: () => void;
  onUpdateCategory: () => void;
}

export function ProductBulkActions({
  selectedCount,
  onClear,
  onDelete,
  onUpdateStock,
  onUpdateCategory,
}: ProductBulkActionsProps) {
  if (selectedCount === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 rounded-full border bg-background px-2 py-2 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={onClear}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Clear Selection</span>
      </Button>

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-2 px-2 whitespace-nowrap">
        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-muted px-2 text-sm font-semibold">
          {selectedCount}
        </span>
        <span className="text-sm font-medium">products selected</span>
      </div>
      <div className="h-6 w-px bg-border" />
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-lg"
        onClick={onUpdateStock}
        title="Update stock"
      >
        <PackagePlus className="h-4 w-4" />
        <span className="sr-only">Update stock</span>
      </Button>
       <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-lg"
        onClick={onUpdateCategory}
        title="Update category"
      >
        <Tags className="h-4 w-4" />

        <span className="sr-only">
          Update category
        </span>
      </Button>
      <Button
        variant="destructive"
        size="icon"
        className="h-9 w-9 rounded-lg"
        onClick={onDelete}
        title="Delete selected products"
      >
        <Trash2 className="h-4 w-4" />

        <span className="sr-only">
          Delete selected products
        </span>
      </Button>
    </div>
  );
}
