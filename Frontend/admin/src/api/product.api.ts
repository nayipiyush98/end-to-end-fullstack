import { api } from "@/api/axios";
import {
  productsResponseSchema,
  type ProductsResponse,
  type Product,
  type Pagination,
  productSchema
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
    isArchived?: boolean;
  }
): Promise<ProductsResponse> {
 const response = await api.get("/products", {
  params,
});

  return productsResponseSchema.parse(response);
}

export async function getProductById(
  id: number
): Promise<Product> {
  const response = await api.get(`/products/${id}`);

  return productSchema.parse(response.data);
}

export const updateProductsCategory = async (
  ids: number[],
  categoryId: number
) => {
  const response = await api.patch("/products/category", {
    ids,
    categoryId,
  });

  return response;
};


export async function createProduct(
  data: FormData
) {
  const response = await api.post(
    "/products",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}


export async function updateProduct(
  id: number,
  data: FormData
) {
  const response = await api.put(
    `/products/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}



export const deleteProducts = async (ids: number[]) => {
  const response = await api.delete("/products", {
    data: {
      ids,
    },
  });

  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

export const updateProductStock = async (
  id: number,
  stock: number
) => {
  const response = await api.patch(`/products/${id}/stock`, {
    stock,
  });

  return response;
};