import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/db.js"

export async function findProducts(
  args: Prisma.ProductFindManyArgs
) {
  return prisma.product.findMany(args);
}

export async function findProductById(
  args: Prisma.ProductFindUniqueArgs
) {
  return prisma.product.findUnique(args);
}

export async function countProducts(
  args: Prisma.ProductCountArgs
) {
  return prisma.product.count(args);
}

export async function createProduct(
  args: Prisma.ProductCreateArgs
) {
  return prisma.product.create(args);
}

export async function updateProduct(
  args: Prisma.ProductUpdateArgs
) {
  return prisma.product.update(args);
}

export async function updateProductStock(
  id: number,
  stock: number
) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      stock,
    },
  });
}

export async function deleteProduct(
  args: Prisma.ProductDeleteArgs
) {
  return prisma.product.delete(args);
}

export async function archiveProduct(id:number){
  return prisma.product.update({
    where:{
      id
    },
    data:{
      isArchived:true
    }
  })
}

export async function addProductImages(
  id: number,
  imageUrls: string[]
) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      images: {
        push: imageUrls,
      },
    },
  });
}