import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  parentId: z.number().nullable(),
});

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  parentId: z.number().nullable(),
});

export const categoryResponseSchema = z.object({
  message: z.string(),
  data: categorySchema,
});

export const categoriesResponseSchema = z.object({
  message: z.string(),
  data: z.array(categorySchema),
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryFormData = z.infer<
  typeof categoryFormSchema
>;