import { prisma } from "../config/db.js";
export async function getUsersService() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return users;
}
//# sourceMappingURL=users.servies.js.map