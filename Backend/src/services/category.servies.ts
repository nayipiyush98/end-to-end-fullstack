import { createCategories, deleteCategory, getCategories, updateCategory } from "../models/category.model.js";
import type { createCategoryInput, updateCategoryInput } from "../zod/categoryZod.js";
import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/db.js";

export async function getCategoriesServies(){
    return await getCategories({
        include:{
            parent:true,
            children:true,
            _count:{
                select:{
                    products:true
                }
            }
        },
        orderBy:{
            name:"asc"
        }
    })
}

export async function createCategoryService(data:createCategoryInput) {
    return await createCategories({
        data:{
            name:data.name,
            slug:data.slug,
            parentId:data.parentId ?? null
        }
    })
}

export async function updateCategoryService(id:number,data:updateCategoryInput){
    return await updateCategory({
        where:{
            id,
        },
        data: data as unknown as Prisma.CategoryUpdateInput,

    })
}

export async function deleteCategoryService(id:number){
    const category = await prisma.category.findUnique({
        where:{
            id
        },
        include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    })


  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  if (category._count.products > 0) {
    throw new Error("CATEGORY_HAS_PRODUCTS");
  }
  
   return deleteCategory({
    where: {
      id,
    },
  });
}