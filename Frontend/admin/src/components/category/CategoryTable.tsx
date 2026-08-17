import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CategoryActions } from "./CategoryActions";

import type { Category } from "@/zod/category.schema";

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({
  categories,
}: CategoryTableProps) {
  const renderCategory = (
    category: Category,
    level: number = 0
  ): React.ReactNode[] => {
    const children = categories.filter(
      (item) => item.parentId === category.id
    );

    const rows: React.ReactNode[] = [];

    rows.push(
      <TableRow key={`category-${category.id}`}>
        <TableCell>
          <div
            className="font-medium"
            style={{
              paddingLeft: `${level * 32}px`,
            }}
          >
            {level > 0 && "↳ "}
            {category.name}
          </div>
        </TableCell>

        <TableCell>
          {category.slug}
        </TableCell>

        <TableCell>
          {category.parentId === null
            ? "—"
            : categories.find(
                (item) =>
                  item.id === category.parentId
              )?.name ?? "—"}
        </TableCell>

        <TableCell>
          <CategoryActions
            category={category}
            onEdit={(category) => {
              console.log(
                "Edit category:",
                category
              );
            }}
            onDelete={(category) => {
              console.log(
                "Delete category:",
                category
              );
            }}
          />
        </TableCell>
      </TableRow>
    );

    children.forEach((child) => {
      rows.push(
        ...renderCategory(
          child,
          level + 1
        )
      );
    });

    return rows;
  };

  const parentCategories = categories.filter(
    (category) => category.parentId === null
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {parentCategories.flatMap((category) =>
            renderCategory(category)
          )}
        </TableBody>
      </Table>
    </div>
  );
}