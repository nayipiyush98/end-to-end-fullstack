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


export const productFormSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters"),

  price: z
    .coerce
    .number()
    .positive("Price must be greater than 0"),

  stock: z
    .coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  sku: z
    .string()
    .min(1, "SKU is required"),

  categoryId: z
    .coerce
    .number()
    .int()
    .positive("Please select a category"),

  isArchived: z.boolean(),

  images: z
    .array(z.instanceof(File))
    .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productResponseSchema = z.object({
  message: z.string(),
  data: productSchema,
});