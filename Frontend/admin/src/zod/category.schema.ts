import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  parentId: z.number().nullable(),
});

export const categoriesResponseSchema = z.object({
  message: z.string(),
  data: z.array(categorySchema),
});

export type Category = z.infer<typeof categorySchema>;

export type CategoriesResponse = z.infer<
  typeof categoriesResponseSchema
>;