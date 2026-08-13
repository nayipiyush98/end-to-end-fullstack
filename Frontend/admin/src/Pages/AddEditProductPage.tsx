import { API_HOST } from "@/lib/constants";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  productFormSchema,
  type ProductFormValues,
} from "@/zod/product.schema";

import {
  createProduct,
  getProductById,
  updateProduct,
} from "@/api/product.api";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import { Loader2, ArrowLeft, Upload, X } from "lucide-react";

export function AddEditProductPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),

    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      sku: "",
      categoryId: 0,
      isArchived: false,
      images: [],
    },
  });

  const isArchived = watch("isArchived");

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadProduct = async () => {
      try {
        setIsLoadingProduct(true);
        setServerError(null);

        const product = await getProductById(Number(id));

        reset({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          sku: product.sku,
          categoryId: product.categoryId,
          isArchived: product.isArchived,
          images: [],
        });

        setImagePreview(product.images ?? []);
      } catch (error) {
        console.error("GET PRODUCT ERROR:", error);

        setServerError(
          error instanceof Error ? error.message : "Failed to load product",
        );
      } finally {
        setIsLoadingProduct(false);
      }
    };

    loadProduct();
  }, [id, reset]);

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreview((prev) => [...prev, ...previews]);

    // Allow selecting the same file again
    event.target.value = "";
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      setServerError(null);

      const formData = new FormData();

      formData.append("name", values.name);

      formData.append("description", values.description);

      formData.append("price", String(values.price));

      formData.append("stock", String(values.stock));

      formData.append("sku", values.sku);

      formData.append("categoryId", String(values.categoryId));

      formData.append("isArchived", String(values.isArchived));

      imageFiles.forEach((file) => {
  formData.append("images", file);
});

      if (isEditMode) {
        await updateProduct(Number(id), formData);
      } else {
        await createProduct(formData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("SAVE PRODUCT ERROR:", error);

      setServerError(
        error instanceof Error ? error.message : "Failed to save product",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}

      <div className="flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/products")}
        >
          <ArrowLeft />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold">
            {isEditMode ? "Edit Product" : "Create Product"}
          </h1>

          <p className="text-muted-foreground">
            {isEditMode
              ? "Update the product information."
              : "Add a new product to your store."}
          </p>
        </div>
      </div>

      {/* Error */}

      {serverError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* Form */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold">Basic Information</h2>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Product Name</Label>

              <Input {...register("name")} placeholder="Enter product name" />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                {...register("description")}
                placeholder="Enter product description"
                rows={5}
              />

              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold">Product Details</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>SKU</Label>

              <Input {...register("sku")} placeholder="SKU-001" />

              {errors.sku && (
                <p className="text-sm text-red-500">{errors.sku.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category ID</Label>

              <Input
                type="number"
                {...register("categoryId")}
                placeholder="Category ID"
              />

              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Price</Label>

              <Input
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="0.00"
              />

              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>

              <Input type="number" {...register("stock")} placeholder="0" />

              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold">Product Images</h2>

          <label
            htmlFor="images"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center hover:bg-muted/50"
          >
            <Upload className="mb-3 h-8 w-8 text-muted-foreground" />

            <span className="font-medium">Upload product images</span>

            <span className="mt-1 text-sm text-muted-foreground">
              PNG, JPG or WEBP
            </span>

            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImagesChange}
            />
          </label>

          {imagePreview.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {imagePreview.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg border">
                  <img
                    src={
                      image.startsWith("blob:")
                        ? image
                        : image.startsWith("http")
                          ? image
                          : `${API_HOST}${image}`
                    }
                    alt={`Product ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Product Status</h2>

              <p className="text-sm text-muted-foreground">
                Archive this product if it should no longer appear as an active
                product.
              </p>
            </div>

            <Switch
              checked={isArchived}
              onCheckedChange={(value) => setValue("isArchived", value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {isEditMode ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
