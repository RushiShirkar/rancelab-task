"use client"
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@components/UI/Button";
import { Pagination } from "@components/UI/Pagination";
import CategoryBadges from "./CategoryBadges";
import AddCategoryDialog from "./AddCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import DishesTable from "./DishesTable";
import AddDishDialog from "./AddDishDialog";
import DeleteDishDialog from "./DeleteDishDialog";
import type { Category, Dish, Restaurant } from "@/types";
import { useRestaurantDetails } from "@/hooks/useRestaurantDetails";

// Extend the Restaurant type to include relations and pagination data
interface RestaurantWithRelations extends Restaurant {
    categories: Category[];
    dishes: Dish[];
    dishesTotal: number;
    dishesTotalPages: number;
    dishesCurrentPage: number;
}

interface RestaurantDetailClientProps {
    restaurantData: RestaurantWithRelations;
}

const RestaurantDetailClient = ({ restaurantData }: RestaurantDetailClientProps) => {
    const router = useRouter();
    const {
        categories,
        dishes,
        isPending,
        handleAddCategory,
        handleDeleteCategory,
        handleAddDish,
        handleDeleteDish,
        handleDishesPageChange,
    } = useRestaurantDetails(restaurantData);

    // UI state for dialogs
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = React.useState(false);
    const [isDishDialogOpen, setIsDishDialogOpen] = React.useState(false);
    const [deleteCategoryDialogOpen, setDeleteCategoryDialogOpen] = React.useState(false);
    const [deleteDishDialogOpen, setDeleteDishDialogOpen] = React.useState(false);
    const [categoryToDelete, setCategoryToDelete] = React.useState<string | null>(null);
    const [dishToDelete, setDishToDelete] = React.useState<string | null>(null);

    // Category dialog handlers
    const onAddCategory = (name: string) => {
        handleAddCategory(name);
        setIsCategoryDialogOpen(false);
    };
    const onDeleteCategory = (id: string) => {
        setCategoryToDelete(id);
        setDeleteCategoryDialogOpen(true);
    };
    const confirmDeleteCategory = () => {
        if (!categoryToDelete) return;
        handleDeleteCategory(categoryToDelete);
        setDeleteCategoryDialogOpen(false);
        setCategoryToDelete(null);
    };

    // Dish dialog handlers
    const onAddDish = (dishData: { name: string; description: string; image: string; spiceLevel: string; categoryIds: string[] }) => {
        handleAddDish(dishData);
        setIsDishDialogOpen(false);
    };
    const onDeleteDish = (id: string) => {
        setDishToDelete(id);
        setDeleteDishDialogOpen(true);
    };
    const confirmDeleteDish = () => {
        if (!dishToDelete) return;
        handleDeleteDish(dishToDelete);
        setDeleteDishDialogOpen(false);
        setDishToDelete(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Button variant="ghost" onClick={() => router.push("/restaurants")} className="mb-4 gap-2 pl-0">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Restaurants
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">{restaurantData?.name}</h1>
                <p className="text-muted-foreground mt-2">Manage categories and dishes for this restaurant</p>
            </div>

            {/* Categories Section */}
            <CategoryBadges
                categories={categories}
                onDelete={onDeleteCategory}
                onAddClick={() => setIsCategoryDialogOpen(true)}
            />

            {/* Dishes Section */}
            <DishesTable
                dishes={dishes}
                categories={categories}
                onAddClick={() => setIsDishDialogOpen(true)}
                onDelete={onDeleteDish}
            />

            {/* Dishes Pagination */}
            <Pagination
                currentPage={restaurantData.dishesCurrentPage}
                totalPages={restaurantData.dishesTotalPages}
                onPageChange={handleDishesPageChange}
            />

            {/* Dialogs */}
            <AddCategoryDialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen} onAdd={onAddCategory} />
            <DeleteCategoryDialog open={deleteCategoryDialogOpen} onOpenChange={setDeleteCategoryDialogOpen} isPending={isPending} onConfirm={confirmDeleteCategory} />
            <AddDishDialog open={isDishDialogOpen} onOpenChange={setIsDishDialogOpen} categories={categories} onAdd={onAddDish} />
            <DeleteDishDialog open={deleteDishDialogOpen} onOpenChange={setDeleteDishDialogOpen} isPending={isPending} onConfirm={confirmDeleteDish} />
        </div>
    );
};

export default RestaurantDetailClient;