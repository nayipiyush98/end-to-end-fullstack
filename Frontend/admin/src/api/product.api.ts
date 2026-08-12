import { api } from "@/api/axios";
import {
  productsResponseSchema,
  type ProductsResponse,
  type Product,
  type Pagination
} from "@/zod/product.schema";

export type {
  Pagination,
  Product,
  ProductsResponse
}

export async function getProducts(
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: number;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }
): Promise<ProductsResponse> {
 const response = await api.get("/products", {
  params,
});

  return productsResponseSchema.parse(response);
}

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};