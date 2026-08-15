import z from "zod";
export declare const categorySchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodString;
    parentId: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
export type category = z.infer<typeof categorySchema>;
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    parentId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export type createCategoryInput = z.infer<typeof createCategorySchema>;
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export type updateCategoryInput = z.infer<typeof updateCategorySchema>;
//# sourceMappingURL=categoryZod.d.ts.map