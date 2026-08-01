import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../config/db.js";
export async function createUser(data) {
    return await prisma.user.create({ data });
}
export async function updateUser(id, data) {
    return await prisma.user.update({
        where: { id },
        data,
    });
}
export async function findByEmailUser(email) {
    return await prisma.user.findUnique({
        where: { email }
    });
}
export async function findByIdUser(args) {
    return prisma.user.findUnique(args);
}
export async function deleteUser(id) {
    return await prisma.user.delete({
        where: { id }
    });
}
//# sourceMappingURL=user.model.js.map