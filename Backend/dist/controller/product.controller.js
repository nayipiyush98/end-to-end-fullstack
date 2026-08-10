import { response } from "express";
import { productQuerySchema, createProductSchema, updateProductSchema, updateStockSchema, } from "../zod/productZod.js";
import { getProducts, getProductById, createProductService, updateProductService, updateStockService, deleteProductService, addProductImagesService, } from "../services/product.servies.js";
export async function getProductsController(req, res) {
    try {
        const query = productQuerySchema.parse(req.query);
        const products = await getProducts(query);
        res.status(200).json({
            message: "Products fetched successfully",
            data: products,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }
    }
}
export async function getProductByIdController(req, res) {
    try {
        const id = Number(req.params.id);
        if (id <= 0 || !Number.isInteger(id)) {
            res.status(400).json({
                message: "Invalid product ID",
            });
            return;
        }
        const product = await getProductById(id);
        if (!product || product.isArchived) {
            res.status(404).json({
                message: "Product not found",
            });
            return;
        }
        res.status(200).json({
            message: "Product fetched successfully",
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while fetching product",
        });
    }
}
export async function createProductController(req, res) {
    try {
        const files = req.files;
        const imageUrls = files?.map((file) => `/images/${file.filename}`) ?? [];
        const data = createProductSchema.parse({ ...req.body, images: imageUrls });
        const product = await createProductService(data);
        res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "Something went wrong while creating product",
        });
    }
}
export async function updateProductController(req, res) {
    try {
        const productId = Number(req.params.id);
        if (Number.isNaN(productId)) {
            res.status(400).json({
                message: "Invalid product ID",
            });
            return;
        }
        const files = req.files;
        const imageUrls = files?.map((file) => `/images/${file.filename}`) ?? [];
        const data = updateProductSchema.parse({
            ...req.body,
            ...(files?.length > 0 && {
                images: imageUrls,
            }),
        });
        const product = await updateProductService(productId, data);
        res.status(200).json({
            message: "Product updated successfully",
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong while updating product",
        });
    }
}
export async function updateStockController(req, res) {
    try {
        const productId = Number(req.params.id);
        if (Number.isNaN(productId)) {
            res.status(400).json({
                message: "Invalid product ID",
            });
            return;
        }
        const { stock } = updateStockSchema.parse(req.body);
        const product = await updateStockService(productId, stock);
        res.status(200).json({
            message: "Product stock updated successfully",
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong while updating product stock",
        });
    }
}
export async function deleteProductController(req, res) {
    try {
        const productId = Number(req.params.id);
        if (Number.isNaN(productId)) {
            res.status(400).json({
                message: "Invalid product ID",
            });
            return;
        }
        const product = await deleteProductService(productId);
        res.status(200).json({
            message: "Product deleted successfully",
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong while updating product stock",
        });
    }
}
export async function addProductImagesController(req, res) {
    try {
        const productId = Number(req.params.id);
        if (Number.isNaN(productId)) {
            res.status(400).json({
                message: "Invalid product ID",
            });
            return;
        }
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(400).json({
                message: "At least one image is required",
            });
            return;
        }
        const imageUrls = files.map((file) => `/images/${file.filename}`);
        const product = await addProductImagesService(productId, imageUrls);
        res.status(200).json({
            message: "Product images uploaded successfully",
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong while uploading product images",
        });
    }
}
//# sourceMappingURL=product.controller.js.map