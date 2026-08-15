import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/db.js";
export async function getCategories(args) {
    return prisma.category.findMany(args);
}
export async function createCategories(args) {
    return prisma.category.create(args);
}
export async function updateCategory(args) {
    return prisma.category.update(args);
}
export async function deleteCategory(args) {
    return prisma.category.delete(args);
}
//# sourceMappingURL=category.model.js.map