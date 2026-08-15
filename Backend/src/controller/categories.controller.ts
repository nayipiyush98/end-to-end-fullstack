import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesServies,
  updateCategoryService,
} from "../services/category.servies.js";
import type { Request, Response } from "express";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../zod/categoryZod.js";

export async function getAllCategories(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const categories = await getCategoriesServies();

    res.status(200).json({
      message: "categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
}

export async function createCategoryController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const data = createCategorySchema.parse(req.body);

    const category = await createCategoryService(data);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Failed to create category",
    });
  }
}

export async function updateCategoryController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "Invalid category ID",
      });
      return;
    }

    const data = updateCategorySchema.parse(req.body);

    const category = await updateCategoryService(id, data);

    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Failed to update category",
    });
  }
}

export async function deleteCategoryController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).send({
        message: "Invalid category ID",
      });
    }

    await deleteCategoryService(id);

    res.status(200).send({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Delete Category error:",error)

    if(error instanceof Error && error.message === "CATEGORY_HAS_PRODUCTS"){
        res.status(409).json({
        message:
          "Cannot delete this category because products are assigned to it.",
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === "CATEGORY_NOT_FOUND"
    ) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }

     res.status(500).json({
      message: "Failed to delete category",
    });
  }
}
