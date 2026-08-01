import { prisma } from "../../config/db.js"
import { Prisma } from "../../generated/prisma/client.js"

export async function createRole(data:Prisma.RoleCreateInput){
    return await prisma.role.create({
        data
    })
}

export async function updateRole(id:number,data:Prisma.RoleUpdateInput){
    return await prisma.role.update({
        where:{id},
        data
    })
}


export async function findByIdRole(id:number){
    return await prisma.role.findUnique({
        where:{id}
    })
}

export async function findByNameRole(name:string){
    return await prisma.role.findUnique({
        where:{name}
    })
}

export async function deleteRole(id:number) {
    return await prisma.role.delete({
        where:{id}
    })
}