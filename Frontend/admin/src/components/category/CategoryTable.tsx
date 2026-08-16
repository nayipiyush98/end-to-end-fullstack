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
          {parentCategories.map((parent) => {
            const children = categories.filter(
              (category) => category.parentId === parent.id
            );

            return (
              <>
                <TableRow key={parent.id}>
                  <TableCell className="font-medium">
                    {parent.name}
                  </TableCell>

                  <TableCell>
                    {parent.slug}
                  </TableCell>

                  <TableCell>
                    —
                  </TableCell>

                  <TableCell>
                     <CategoryActions
    category={parent}
    onEdit={(category) => {
      console.log("Edit category:", category);
    }}
  />
                  </TableCell>
                </TableRow>

                {children.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell>
                      <div className="pl-8">
                        ↳ {child.name}
                      </div>
                    </TableCell>

                    <TableCell>
                      {child.slug}
                    </TableCell>

                    <TableCell>
                      {parent.name}
                    </TableCell>

                    <TableCell>
                       <CategoryActions
    category={parent}
    onEdit={(category) => {
      console.log("Edit category:", category);
    }}
  />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}