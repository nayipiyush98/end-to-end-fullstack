import {
  findProducts,
  countProducts,
  findProductById,
  createProduct,
  updateProduct,
  updateProductStock,
  archiveProduct,
  addProductImages,
} from "../models/product.model.js";
import type { Prisma } from "../generated/prisma/client.js";
import type {
  CreateProductData,
  ProductQuery,
  UpdateProductInput,
} from "../zod/productZod.js";
import { prisma } from "../config/db.js";

export async function getProducts(query: ProductQuery) {
  const { page, limit, search, category, minPrice, maxPrice, sort } = query;

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    ...(query.isArchived !== undefined && {
    isArchived: query.isArchived,
  }),


    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          sku: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),

    ...(category && {
      categoryId: category,
    }),

    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),

            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
  };

  let orderBy: Prisma.ProductOrderByWithRelationInput;

  switch (sort) {
    case "price_asc":
      orderBy = {
        price: "asc",
      };
      break;

    case "price_desc":
      orderBy = {
        price: "desc",
      };
      break;

    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "name_asc":
      orderBy = {
        name: "asc",
      };
      break;

    case "name_desc":
      orderBy = {
        name: "desc",
      };
      break;

    case "newest":
    default:
      orderBy = {
        createdAt: "desc",
      };
      break;
  }

  const [products, total] = await Promise.all([
    findProducts({
      where,
      skip,
      take: query.limit,
      orderBy,

      include: {
        category: true,
      },
    }),
    countProducts({
      where,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    products,

    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

export async function getProductById(id: number) {
  const product = await findProductById({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return product;
}

export async function createProductService(data: CreateProductData) {
  const product = await createProduct({
    data: {
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
      images: data.images,
      sku: data.sku,
      isArchived: data.isArchived,
    },
    include: {
      category: true,
    },
  });
  return product;
}


export async function updateProductService(
  id: number,
  data: UpdateProductInput
) {
  const updateData: Prisma.ProductUncheckedUpdateInput = {
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.description !== undefined
      ? { description: data.description }
      : {}),
    ...(data.price !== undefined ? { price: data.price } : {}),
    ...(data.stock !== undefined ? { stock: data.stock } : {}),
    ...(data.categoryId !== undefined
      ? { categoryId: data.categoryId }
      : {}),
    ...(data.sku !== undefined ? { sku: data.sku } : {}),
    ...(data.isArchived !== undefined
      ? { isArchived: data.isArchived }
      : {}),
    ...(data.images !== undefined ? { images: data.images } : {}),
  };

  return updateProduct({
    where: {
      id,
    },
    data: updateData,
  });
}

export async function updateStockService(
  id: number,
  stock: number
) {
  return updateProductStock(id, stock);
}

export async function deleteProductService(id:number){
    return archiveProduct(id)
}

export async function addProductImagesService(
  id: number,
  imageUrls: string[]
) {
  return addProductImages(id, imageUrls);
}

export const deleteProducts = async (ids: number[]) => {
  return prisma.product.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      isArchived: true,
    },
  });
};