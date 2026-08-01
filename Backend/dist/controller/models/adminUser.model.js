import { prisma } from "../../config/db.js";
import { Prisma } from "../../generated/prisma/client.js";
export async function createAdmin(data) {
    return await prisma.adminUser.create({
        data
    });
}
export async function updateAdmin(id, data) {
    return await prisma.adminUser.update({
        where: { id },
        data
    });
}
export async function findByEmailAdmin(args) {
    return prisma.adminUser.findUnique(args);
}
export async function findByIdAdmin(id) {
    return await prisma.adminUser.findUnique({
        where: { id }
    });
}
export async function deleteAdmin(id) {
    return await prisma.adminUser.delete({
        where: { id }
    });
}
//# sourceMappingURL=adminUser.model.js.map