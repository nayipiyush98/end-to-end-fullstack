import { api } from "@/api/axios";
import {
  categoriesResponseSchema,
  type CategoriesResponse,
} from "@/zod/category.schema";

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get("/categories");

  return categoriesResponseSchema.parse(response);
};