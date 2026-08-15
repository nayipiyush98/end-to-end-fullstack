import z from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  parentId: z.number().nullable(),
});

export type category = z.infer<typeof categorySchema>;

export const createCategorySchema = z.object({
  name: z.string().min(1, "category name is required"),
  slug: z.string().min(1, "slug is rrequired"),
  parentId: z.number().int().positive().nullable().optional(),
});

export type createCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  parentId: z.number().int().positive().nullable().optional(),
});

export type updateCategoryInput = z.infer<typeof updateCategorySchema>;
