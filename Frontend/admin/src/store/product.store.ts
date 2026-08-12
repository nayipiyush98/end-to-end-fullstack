import { create } from "zustand";
import {
  getProducts,
  deleteProduct,
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
  }) => Promise<void>;

  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
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

      await deleteProduct(id);


      set((state) => ({
        products: state.products.filter(
          (product) => product.id !== id
        ),
      }));
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);

      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete product",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));