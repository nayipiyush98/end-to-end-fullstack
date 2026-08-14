import { findProducts, countProducts, findProductById, createProduct, updateProduct, updateProductStock, archiveProduct, addProductImages, } from "../models/product.model.js";
import { prisma } from "../config/db.js";
export async function getProducts(query) {
    const { page, limit, search, category, minPrice, maxPrice, sort } = query;
    const skip = (page - 1) * limit;
    const where = {
        ...(query.isArchived !== undefined && {
            isArchived: query.isArchived,
        }),
        ...(search && {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    sku: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        }),
        ...(category && {
            categoryId: category,
        }),
        ...(minPrice !== undefined || maxPrice !== undefined
            ? {
                price: {
                    ...(minPrice !== undefined ? { gte: minPrice } : {}),
                    ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
                },
            }
            : {}),
    };
    let orderBy;
    switch (sort) {
        case "price_asc":
            orderBy = {
                price: "asc",
            };
            break;
        case "price_desc":
            orderBy = {
                price: "desc",
            };
            break;
        case "oldest":
            orderBy = {
                createdAt: "asc",
            };
            break;
        case "name_asc":
            orderBy = {
                name: "asc",
            };
            break;
        case "name_desc":
            orderBy = {
                name: "desc",
            };
            break;
        case "newest":
        default:
            orderBy = {
                createdAt: "desc",
            };
            break;
    }
    const [products, total] = await Promise.all([
        findProducts({
            where,
            skip,
            take: query.limit,
            orderBy,
            include: {
                category: true,
            },
        }),
        countProducts({
            where,
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        products,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
}
export async function getProductById(id) {
    const product = await findProductById({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return product;
}
export async function createProductService(data) {
    const product = await createProduct({
        data: {
            name: data.name,
            description: data.description ?? null,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId,
            images: data.images,
            sku: data.sku,
            isArchived: data.isArchived,
        },
        include: {
            category: true,
        },
    });
    return product;
}
export async function updateProductService(id, data) {
    const updateData = {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.description !== undefined
            ? { description: data.description }
            : {}),
        ...(data.price !== undefined ? { price: data.price } : {}),
        ...(data.stock !== undefined ? { stock: data.stock } : {}),
        ...(data.categoryId !== undefined
            ? { categoryId: data.categoryId }
            : {}),
        ...(data.sku !== undefined ? { sku: data.sku } : {}),
        ...(data.isArchived !== undefined
            ? { isArchived: data.isArchived }
            : {}),
        ...(data.images !== undefined ? { images: data.images } : {}),
    };
    return updateProduct({
        where: {
            id,
        },
        data: updateData,
    });
}
export async function updateStockService(id, stock) {
    return updateProductStock(id, stock);
}
export async function deleteProductService(id) {
    return archiveProduct(id);
}
export async function addProductImagesService(id, imageUrls) {
    return addProductImages(id, imageUrls);
}
export const deleteProducts = async (ids) => {
    return prisma.product.updateMany({
        where: {
            id: {
                in: ids,
            },
        },
        data: {
            isArchived: true,
        },
    });
};
//# sourceMappingURL=product.servies.js.map