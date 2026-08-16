import type { Prisma } from "../generated/prisma/client.js";
import type { CreateProductData, ProductQuery, UpdateProductInput } from "../zod/productZod.js";
export declare function getProducts(query: ProductQuery): Promise<{
    products: {
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        sku: string;
        images: string[];
        categoryId: number;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}>;
export declare function getProductById(id: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    stock: number;
    sku: string;
    images: string[];
    categoryId: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare function createProductService(data: CreateProductData): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    stock: number;
    sku: string;
    images: string[];
    categoryId: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateProductService(id: number, data: UpdateProductInput): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    stock: number;
    sku: string;
    images: string[];
    categoryId: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateStockService(id: number, stock: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    stock: number;
    sku: string;
    images: string[];
    categoryId: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteProductService(id: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    stock: number;
    sku: string;
    images: string[];
    categoryId: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function addProductImagesService(id: number, imageUrls: string[]): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    stock: number;
    sku: string;
    images: string[];
    categoryId: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteProducts: (ids: number[]) => Promise<Prisma.BatchPayload>;
export declare const updateProductCategoryService: (ids: number[], categoryId: number) => Promise<Prisma.BatchPayload>;
//# sourceMappingURL=product.servies.d.ts.map