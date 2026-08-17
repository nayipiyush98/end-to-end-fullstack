import { createCategories, deleteCategory, getCategories, updateCategory } from "../models/category.model.js";
import { prisma } from "../config/db.js";
export async function getCategoriesServies() {
    return await getCategories({
        include: {
            parent: true,
            children: true,
            _count: {
                select: {
                    products: true
                }
            }
        },
        orderBy: {
            name: "asc"
        }
    });
}
export async function createCategoryService(data) {
    return await createCategories({
        data: {
            name: data.name,
            slug: data.slug,
            parentId: data.parentId ?? null
        }
    });
}
export async function updateCategoryService(id, data) {
    return await updateCategory({
        where: {
            id,
        },
        data: data,
    });
}
export async function deleteCategoryService(id) {
    const category = await prisma.category.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });
    if (!category) {
        throw new Error("CATEGORY_NOT_FOUND");
    }
    if (category._count.products > 0) {
        throw new Error(`Cannot delete category. It has ${category._count.products} attached product(s).`);
    }
    return deleteCategory({
        where: {
            id,
        },
    });
}
//# sourceMappingURL=category.servies.js.map