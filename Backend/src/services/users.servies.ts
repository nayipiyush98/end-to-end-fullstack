import { prisma } from "../config/db.js";

export async function getUsersService(
  email?: string
) {
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