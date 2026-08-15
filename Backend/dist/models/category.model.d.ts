import { Prisma } from "../generated/prisma/client.js";
export declare function getCategories(args: Prisma.CategoryFindManyArgs): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}[]>;
export declare function createCategories(args: Prisma.CategoryCreateArgs): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}>;
export declare function updateCategory(args: Prisma.CategoryUpdateArgs): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}>;
export declare function deleteCategory(args: Prisma.CategoryDeleteArgs): Promise<{
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
}>;
//# sourceMappingURL=category.model.d.ts.map