import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/db.js";
export async function findProducts(args) {
    return prisma.product.findMany(args);
}
export async function findProductById(args) {
    return prisma.product.findUnique(args);
}
export async function countProducts(args) {
    return prisma.product.count(args);
}
export async function createProduct(args) {
    return prisma.product.create(args);
}
export async function updateProduct(args) {
    return prisma.product.update(args);
}
export async function updateProductStock(id, stock) {
    return prisma.product.update({
        where: {
            id,
        },
        data: {
            stock,
        },
    });
}
export async function deleteProduct(args) {
    return prisma.product.delete(args);
}
export async function archiveProduct(id) {
    return prisma.product.update({
        where: {
            id
        },
        data: {
            isArchived: true
        }
    });
}
export async function addProductImages(id, imageUrls) {
    return prisma.product.update({
        where: {
            id,
        },
        data: {
            images: {
                push: imageUrls,
            },
        },
    });
}
//# sourceMappingURL=product.model.js.map