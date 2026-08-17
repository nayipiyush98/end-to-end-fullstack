import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { slugify } from "@/lib/slugify";

import { useCategoryStore } from "@/store/category.store";

import {
  categoryFormSchema,
  type CategoryFormData,
} from "@/zod/category.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function AddEditCategoryPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const categories = useCategoryStore(
    (state) => state.categories
  );
  const createCategory = useCategoryStore(
  (state) => state.createCategory
);

const updateCategory = useCategoryStore(
  (state) => state.updateCategory
);

  const isEditMode = Boolean(id);

  const category = isEditMode
    ? categories.find(
        (category) => category.id === Number(id)
      )
    : undefined;

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      parentId: null,
    },
  });

  useEffect(() => {
    if (!category) {
      return;
    }

    form.reset({
      name: category.name,
      slug: category.slug,
      parentId: category.parentId,
    });
  }, [category, form]);

  const onSubmit = async (
  values: CategoryFormData
) => {
  try {
    if (isEditMode) {
      await updateCategory(
        Number(id),
        values
      );
    } else {
      await createCategory(values);
    }

    navigate("/admin/categories");
  } catch (error) {
    console.error(
      "SAVE CATEGORY ERROR:",
      error
    );
  }
};
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {isEditMode
            ? "Edit Category"
            : "Create Category"}
        </h1>

        <p className="text-muted-foreground">
          {isEditMode
            ? "Update category information."
            : "Create a new product category."}
        </p>
      </div>
            <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>
            {isEditMode
              ? "Category Details"
              : "New Category"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                        onChange={(event) => {
                            const name = event.target.value
                            field.onChange(name)
                            form.setValue("slug",slugify(name),{shouldValidate:true})
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Slug
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="category-slug"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Parent Category */}
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Parent Category
                    </FormLabel>

                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={
                          field.value === null
                            ? ""
                            : String(field.value)
                        }
                        onChange={(event) => {
                          const value =
                            event.target.value;

                          field.onChange(
                            value === ""
                              ? null
                              : Number(value)
                          );
                        }}
                      >
                        <option value="">
                          No Parent Category
                        </option>

                        {categories
                          .filter(
                            (item) =>
                              item.id !==
                              Number(id)
                          )
                          .map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    navigate("/admin/categories")
                  }
                >
                  Cancel
                </Button>

                <Button type="submit">
                  {isEditMode
                    ? "Update Category"
                    : "Create Category"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}