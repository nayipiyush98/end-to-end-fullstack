import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X,SlidersHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  table: any;
}

export function ProductToolbar({
  search,
  onSearchChange,
  onReset,
  table,
}: ProductToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Search + Reset */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-75"
        />

        {search && (
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
          >
            Reset
            <X />
          </Button>
        )}
      </div>

  
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline">
             <SlidersHorizontal/> View
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column: any) => column.getCanHide())
            .map((column: any) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}