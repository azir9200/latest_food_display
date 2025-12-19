"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ChefHat,
  Edit,
  Eye,
  Plus,
  Store,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import MenuItemCard from "./MenuItemCard";
import MenuItemForm from "./MenuItemForm";
import RestaurantForm from "./RestaurantForm";
import {
  createRestaurant,
  deletedRestaurant,
  updateRestaurant,
} from "@/services/restaurantService";
import { IMenuItem, IRestaurant } from "@/types/restaurant";
import { createMenu, deletedMenu, updateMenu } from "@/services/menuService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type RestaurantsProps = {
  restaurant?: IRestaurant;
};
const RestaurantManagement = ({ restaurant }: RestaurantsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [menuFormOpen, setMenuFormOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<
    IMenuItem | undefined
  >();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!restaurant) {
    return null;
  }

  const handleCreateRestaurant = async (
    data: Omit<
      IRestaurant,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "ownerId"
      | "ownerName"
      | "ownerImage"
      | "menuItems"
    >
  ) => {
    setLoading(true);
    const res = await createRestaurant(data);
    console.log(res);
    toast.success("Restaurant created successfully!");
    setLoading(false);
    setActiveTab("overview");
  };

  const handleUpdateRestaurant = async (
    data: Omit<
      IRestaurant,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "ownerId"
      | "ownerName"
      | "ownerImage"
      | "menuItems"
    >
  ) => {
    setLoading(true);
    const res = await updateRestaurant(restaurant.id, data);
    toast.success("Restaurant updated successfully!");
    setActiveTab("overview");
    setLoading(false);
    setIsEditing(false);
  };

  const handleDeleteRestaurant = async () => {
    const res = await deletedRestaurant(restaurant.id);
    console.log(res);
    toast.success("Restaurant deleted successfully!");
    setDeleteDialogOpen(false);
    setActiveTab("create");
  };

  const handleAddMenuItem = async (data: Omit<IMenuItem, "id">) => {
    const menu = await createMenu(restaurant.id, data);
    toast.success("Menu item added!");
  };

  const handleUpdateMenuItem = async (data: Omit<IMenuItem, "id">) => {
    const menuUpdate = await updateMenu(editingMenuItem!.id, data);
    toast.success("Menu item updated!");
    setEditingMenuItem(undefined);
  };

  const handleDeleteMenuItem = async (itemId: string) => {
    console.log(itemId);
    const menuDeleted = await deletedMenu(itemId);
    console.log(menuDeleted);
    toast.success("Menu item removed!");
  };

  const openEditMenuItem = (item: IMenuItem) => {
    setEditingMenuItem(item);
    setMenuFormOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Restaurant Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your restaurant profile
          </p>
        </div>

        <Link href={`/restaurant/${restaurant?.id}`}>
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            View Public Page
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="gap-2">
            <Store className="h-4 w-4" />
            Overview
          </TabsTrigger>
          {restaurant && (
            <TabsTrigger value="menu" className="gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              Menu ({restaurant?.menuItems?.length || 0})
            </TabsTrigger>
          )}

          {!restaurant ? (
            <TabsTrigger value="create" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Restaurant
            </TabsTrigger>
          ) : (
            <TabsTrigger value="edit" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {!restaurant ? (
            // 🟡 NO RESTAURANT STATE
            <Card className="border-dashed border-2 border-border/60">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <ChefHat className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No Restaurant Found</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  You haven’t created a restaurant yet. Create one to start
                  managing menu items, images, and details.
                </p>
                <Button
                  onClick={() => setActiveTab("create")}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Restaurant
                </Button>
              </CardContent>
            </Card>
          ) : (
            // 🟢 RESTAURANT EXISTS
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      Active
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      Menu Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {restaurant?.menuItems?.length || 0}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {restaurant?.images?.length || 0}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5 text-primary" />
                      {restaurant.name}
                    </CardTitle>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Restaurant
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {restaurant.description}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {restaurant.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">
                        {restaurant.phone || restaurant.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.specialties?.map((s) => (
                        <Badge key={s} variant="secondary">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="menu" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Menu Items</h2>
            <Button
              onClick={() => {
                setEditingMenuItem(undefined);
                setMenuFormOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {restaurant.menuItems ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {restaurant?.menuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  editable
                  onEdit={openEditMenuItem}
                  onDelete={handleDeleteMenuItem}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-border">
              <CardContent className="py-12 text-center">
                <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No menu items yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Add your first menu item to showcase your dishes
                </p>
                <Button onClick={() => setMenuFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Item
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="edit">
          <RestaurantForm
            initialData={false ? undefined : restaurant}
            onSubmit={handleUpdateRestaurant}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="create">
          <RestaurantForm onSubmit={handleCreateRestaurant} loading={loading} />
        </TabsContent>
      </Tabs>

      {/* Menu Item Form Dialog */}
      <MenuItemForm
        open={menuFormOpen}
        onOpenChange={setMenuFormOpen}
        initialData={editingMenuItem}
        onSubmit={editingMenuItem ? handleUpdateMenuItem : handleAddMenuItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Restaurant?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              restaurant profile and all associated menu items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRestaurant}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default RestaurantManagement;
