import { prisma } from "../config/db.js";
import { Prisma } from "../generated/prisma/client.js";
export async function createRole(data) {
    return await prisma.role.create({
        data
    });
}
export async function updateRole(id, data) {
    return await prisma.role.update({
        where: { id },
        data
    });
}
export async function findByIdRole(args) {
    return prisma.role.findUnique(args);
}
export async function findByNameRole(args) {
    return await prisma.role.findUnique(args);
}
export async function deleteRole(id) {
    return await prisma.role.delete({
        where: { id }
    });
}
//# sourceMappingURL=role.model.js.map