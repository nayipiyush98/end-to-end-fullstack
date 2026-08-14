import z from "zod";
export const createProductSchema = z.object({
    name: z
        .string()
        .min(2, "Product name must be at least 2 characters")
        .max(200),
    description: z
        .string()
        .optional(),
    price: z
        .coerce
        .number()
        .positive("Price must be greater than 0"),
    stock: z
        .coerce
        .number()
        .int()
        .min(0, "Stock cannot be negative"),
    categoryId: z
        .coerce
        .number()
        .int()
        .positive(),
    sku: z
        .string()
        .min(1, "SKU is required")
        .max(100),
    isArchived: z.boolean().default(false),
    images: z
        .array(z.string())
        .default([]),
});
export const productQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .default(10),
    search: z
        .string()
        .optional(),
    category: z.coerce
        .number()
        .int()
        .positive()
        .optional(),
    minPrice: z.coerce
        .number()
        .min(0)
        .optional(),
    maxPrice: z.coerce
        .number()
        .min(0)
        .optional(),
    sort: z
        .enum([
        "price_asc",
        "price_desc",
        "newest",
        "oldest",
        "name_asc",
        "name_desc",
    ])
        .default("newest"),
    isArchived: z
        .preprocess((value) => {
        if (value === "true")
            return true;
        if (value === "false")
            return false;
        return undefined;
    }, z.boolean().optional()),
});
export const updateProductSchema = createProductSchema.partial();
export const updateStockSchema = z.object({
    stock: z.coerce.number().int().min(0),
});
export const deleteProductsSchema = z.object({
    ids: z
        .array(z.number().int().positive())
        .min(1, "At least one product is required"),
});
//# sourceMappingURL=productZod.js.map