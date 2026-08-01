import { prisma } from "../../config/db.js";
import { Prisma } from "../../generated/prisma/client.js";

export async function createAdmin(data: Prisma.AdminUserCreateInput) {
  return await prisma.adminUser.create({
    data,
  });
}

export async function updateAdmin(
  id: number,
  data: Prisma.AdminUserUpdateInput,
) {
  return await prisma.adminUser.update({
    where: { id },
    data,
  });
}

export async function findByEmailAdmin(args: Prisma.AdminUserFindUniqueArgs) {
  return prisma.adminUser.findUnique(args);
}

export async function findByIdAdmin(id: number) {
  return await prisma.adminUser.findUnique({
    where: { id },
  });
}

export async function deleteAdmin(id: number) {
  return await prisma.adminUser.delete({
    where: { id },
  });
}
