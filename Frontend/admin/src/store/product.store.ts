import { create } from "zustand";

import {
  getProducts,
  deleteProduct as deleteProductApi,
  deleteProducts as deleteProductsApi,
   updateProductStock,
  type Product,
  type Pagination,
} from "@/api/product.api";

interface ProductState {
  products: Product[];
  pagination: Pagination | null;

  isLoading: boolean;
  error: string | null;

  fetchProducts: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: number;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
      isArchived?: boolean;
  }) => Promise<void>;

  
  deleteProduct: (id: number) => Promise<void>;

  deleteProducts: (ids: number[]) => Promise<void>;

  updateStock: (
  ids: number[],
  stock: number
) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  pagination: null,

  isLoading: false,
  error: null,

  fetchProducts: async (params) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await getProducts(params);

      set({
        products: response.data.products,
        pagination: response.data.pagination,
      });
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);

      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch products",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },



  deleteProduct: async (id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await deleteProductApi(id);

      const pagination = get().pagination;

      await get().fetchProducts({
        page: pagination?.page ?? 1,
        limit: pagination?.limit ?? 10,
      });
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);

      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete product",
      });

      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },



  deleteProducts: async (ids) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await deleteProductsApi(ids);

      const pagination = get().pagination;

      await get().fetchProducts({
        page: pagination?.page ?? 1,
        limit: pagination?.limit ?? 10,
      });
    } catch (error) {
      console.error("BULK DELETE PRODUCT ERROR:", error);

      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete products",
      });

      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  updateStock: async (ids, stock) => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    await Promise.all(
      ids.map((id) =>
        updateProductStock(id, stock)
      )
    );

    const pagination = get().pagination;

    await get().fetchProducts({
      page: pagination?.page ?? 1,
      limit: pagination?.limit ?? 10,
    });
  } catch (error) {
    console.error(
      "UPDATE STOCK ERROR:",
      error
    );

    set({
      error:
        error instanceof Error
          ? error.message
          : "Failed to update stock",
    });

    throw error;
  } finally {
    set({
      isLoading: false,
    });
  }
},
}));