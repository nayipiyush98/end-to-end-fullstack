import { create } from "zustand";
import axios from "axios";
import {
  getCategories,
  deleteCategory as deleteCategoryApi,
  createCategory,
  updateCategory,
} from "@/api/category.api";
import type { Category, CategoryFormData } from "@/zod/category.schema";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

    clearError: () => void;

  fetchCategories: () => Promise<void>;
   deleteCategory: (id: number) => Promise<void>;
    createCategory: (
    data: CategoryFormData
  ) => Promise<void>;

  updateCategory: (
    id: number,
    data: CategoryFormData
  ) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set,get) => ({
  categories: [],
  isLoading: false,
  error: null,

  clearError: () => {
  set({
    error: null,
  });
},

  fetchCategories: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getCategories();

      set({
        categories: response,
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


    createCategory: async (data) => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        await createCategory(data);

        // Refresh table
        await get().fetchCategories();
      } catch (error) {
        console.error(
          "CREATE CATEGORY ERROR:",
          error
        );

        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to create category",
        });

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

    updateCategory: async (id, data) => {
      try {
        set({
          isLoading: true,
          error: null,
        });

        await updateCategory(id, data);

        // Refresh table
        await get().fetchCategories();
      } catch (error) {
        console.error(
          "UPDATE CATEGORY ERROR:",
          error
        );

        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to update category",
        });

        throw error;
      } finally {
        set({
          isLoading: false,
        });
      }
    },

  deleteCategory: async (id) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    await deleteCategoryApi(id);

      const response = await getCategories();
      set({
        categories: response,
      });
    
  } catch (error) {
  console.error("DELETE CATEGORY ERROR:", error);

  let message = "Failed to delete category";

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ??
      "Failed to delete category";
  }

  set({
    error: message,
  });

  throw error;
}finally {
    set({
      isLoading: false,
    });
  }
},
}));