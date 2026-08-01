import { prisma } from "../../config/db.js";
import { Prisma } from "../../generated/prisma/client.js";
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
export async function findByIdRole(id) {
    return await prisma.role.findUnique({
        where: { id }
    });
}
export async function findByNameRole(name) {
    return await prisma.role.findUnique({
        where: { name }
    });
}
export async function deleteRole(id) {
    return await prisma.role.delete({
        where: { id }
    });
}
//# sourceMappingURL=role.model.js.map