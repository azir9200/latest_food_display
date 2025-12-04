"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createCategory,
  deletedCategory,
  updateCategory,
} from "@/services/categoryService";
import { ICategory } from "@/types/comments";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface CategoryManagerProps {
  initialCategories: ICategory[];
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  initialCategories,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const handleSubmit = async () => {
    console.log("handle submit");
    if (!categoryName.trim()) return;
    try {
      if (editingId) {
        await updateCategory(editingId, categoryName);
        toast.success("Category updated successfully");
      } else {
        await createCategory(categoryName);
        toast.success("Category created successfully");
      }

      setCategoryName("");
      setEditingId(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setCategoryName(name);
  };

  const handleDelete = async (id: string) => {
    const res = await deletedCategory(id);
    if (res.success) {
      toast.success("User deleted");
    } else {
      toast.error(`${res.data.meta.constraint}` || "Something is Wrong");
    }
    if (editingId === id) {
      setEditingId(null);
      setCategoryName("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleSubmit}>
            {editingId ? "Update Category" : "Add Category"}
          </Button>
        </div>

        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Posts</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialCategories
                ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
                .map((category: ICategory) => (
                  <tr key={category.id}>
                    <td className="px-4 py-2">{category.name}</td>
                    <td className="px-4 py-2">{category?._count?.posts}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category.id, category.name)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {initialCategories?.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {(page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, initialCategories.length)} of{" "}
              {initialCategories.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              {Array.from({
                length: Math.ceil(initialCategories.length / pageSize) || 1,
              }).map((_, idx) => (
                <Button
                  key={idx}
                  variant={page === idx + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) =>
                    Math.min(
                      Math.ceil(initialCategories.length / pageSize) || 1,
                      p + 1
                    )
                  )
                }
                disabled={
                  page === (Math.ceil(initialCategories.length / pageSize) || 1)
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryManager;
