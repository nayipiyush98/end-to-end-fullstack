import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  stock: z.number(),
  sku: z.string(),
  images: z.array(z.string()),
  categoryId: z.number(),
  isArchived: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),

  category: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    parentId: z.number().nullable(),
  }),
});

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const productsResponseSchema = z.object({
  message: z.string(),

  data: z.object({
    products: z.array(productSchema),
    pagination: paginationSchema,
  }),
});

export type Product = z.infer<typeof productSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type ProductsResponse = z.infer<
  typeof productsResponseSchema
>;