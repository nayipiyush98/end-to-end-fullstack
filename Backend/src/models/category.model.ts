import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/db.js"

export async function getCategories(args:Prisma.CategoryFindManyArgs){
    return prisma.category.findMany(args)
}

export async function createCategories(args:Prisma.CategoryCreateArgs){
    return prisma.category.create(args)
}

export async function updateCategory(args:Prisma.CategoryUpdateArgs){
    return prisma.category.update(args)
}

export async function deleteCategory(args:Prisma.CategoryDeleteArgs){
    return prisma.category.delete(args)
}