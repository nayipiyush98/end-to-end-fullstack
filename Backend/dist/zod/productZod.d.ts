import z from "zod";
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodCoercedNumber<unknown>;
    stock: z.ZodCoercedNumber<unknown>;
    categoryId: z.ZodCoercedNumber<unknown>;
    sku: z.ZodString;
    images: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type CreateProductData = z.infer<typeof createProductSchema>;
export declare const productQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    minPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    sort: z.ZodDefault<z.ZodEnum<{
        name_asc: "name_asc";
        name_desc: "name_desc";
        newest: "newest";
        oldest: "oldest";
        price_asc: "price_asc";
        price_desc: "price_desc";
    }>>;
}, z.core.$strip>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    stock: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    categoryId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    sku: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export declare const updateStockSchema: z.ZodObject<{
    stock: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export type UpdateStockInput = z.infer<typeof updateStockSchema>;
//# sourceMappingURL=productZod.d.ts.map