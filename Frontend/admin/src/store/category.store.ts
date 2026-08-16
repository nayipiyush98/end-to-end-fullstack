import { create } from "zustand";
import {
  getCategories,
  type Category,
} from "@/api/category.api";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getCategories();

      set({
        categories: response.data,
      });
    } catch (error) {
      console.error("FETCH CATEGORIES ERROR:", error);

      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch categories",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));