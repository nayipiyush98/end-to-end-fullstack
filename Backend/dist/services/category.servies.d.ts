import type { createCategoryInput, updateCategoryInput } from "../zod/categoryZod.js";
export declare function getCategoriesServies(): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}[]>;
export declare function createCategoryService(data: createCategoryInput): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}>;
export declare function updateCategoryService(id: number, data: updateCategoryInput): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}>;
export declare function deleteCategoryService(id: number): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}>;
//# sourceMappingURL=category.servies.d.ts.map