import { api } from "@/api/axios";

import {
  categoryResponseSchema,
  categoriesResponseSchema,
  type Category,
  type CategoryFormData,
} from "@/zod/category.schema";

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<unknown>("/categories");

  const parsed = categoriesResponseSchema.parse(response);

  return parsed.data;
}

export async function createCategory(
  data: CategoryFormData
): Promise<Category> {
  const response = await api.post<unknown>(
    "/categories",
    data
  );

  const parsed = categoryResponseSchema.parse(response);

  return parsed.data;
}

export async function updateCategory(
  id: number,
  data: CategoryFormData
): Promise<Category> {
  const response = await api.put<unknown>(
    `/categories/${id}`,
    data
  );

  const parsed = categoryResponseSchema.parse(response);

  return parsed.data;
}

export async function deleteCategory(id: number) {
  return api.delete(`/categories/${id}`);
}