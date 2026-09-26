import { prisma } from "../config/db.js";
export async function getUsersService(email) {
    const users = await prisma.user.findMany({
        ...(email
            ? {
                where: {
                    email: {
                        contains: email,
                        mode: "insensitive",
                    },
                },
            }
            : {}),
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });
    return users;
}
export async function getUserProfileService(id) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
            createdAt: true,
        },
    });
    return user;
}
export async function updateUserProfileService(id, data) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        return null;
    }
    const updatedUser = await prisma.$transaction(async (tx) => {
        await tx.user.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                ...(data.phone !== undefined && {
                    phone: data.phone,
                }),
            },
        });
        if (data.addresses) {
            await tx.userAddress.deleteMany({
                where: {
                    userId: id,
                },
            });
            if (data.addresses.length > 0) {
                await tx.userAddress.createMany({
                    data: data.addresses.map((item) => ({
                        userId: id,
                        address: item.address,
                    })),
                });
            }
        }
        return tx.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                isActive: true,
                createdAt: true,
                addresses: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        id: true,
                        address: true,
                        createdAt: true,
                    },
                },
            },
        });
    });
    return updatedUser;
}
//# sourceMappingURL=users.servies.js.map