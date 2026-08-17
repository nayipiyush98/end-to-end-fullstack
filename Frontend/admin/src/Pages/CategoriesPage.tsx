import { useEffect } from "react";

import { CategoryTable } from "@/components/category/CategoryTable";
import { useCategoryStore } from "@/store/category.store";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Categories() {
    const navigate = useNavigate();
  const categories = useCategoryStore(
    (state) => state.categories
  );

  const isLoading = useCategoryStore(
    (state) => state.isLoading
  );

  const error = useCategoryStore(
    (state) => state.error
  );

  const fetchCategories = useCategoryStore(
    (state) => state.fetchCategories
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading categories...
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
            <h1 className="text-2xl font-semibold">
          Categories
        </h1>

        <p className="text-muted-foreground">
          Manage your product categories.
        </p>
        </div>
        <div>
            <Button
            className="px-3 py-2 font-medium"
            onClick={() => (navigate("/admin/categories/create"))}
          >
            Create <Plus />
          </Button>
        </div>
        
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}