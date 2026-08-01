import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../config/db.js"; 


export async function createUser(data:Prisma.UserCreateInput) {
    return await prisma.user.create({data})
}

export async function updateUser(id:number,data:Prisma.UserUpdateInput) {
    return await prisma.user.update({
        where:{ id }  ,
        data,
    })
}

export async function findByEmailUser(email:string){
    return await prisma.user.findUnique({
        where:{email}
    })
}

export async function findByIdUser(
  args: Prisma.UserFindUniqueArgs
) {
  return prisma.user.findUnique(args);
}

export async function deleteUser(id:number) {
    return await prisma.user.delete({
        where:{id}
    })
}