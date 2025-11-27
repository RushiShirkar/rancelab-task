import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { createCategory, deleteCategory, createDish, deleteDish } from "@/server/actions/restaurant";
import type { Category, Dish, Restaurant } from "@/types";

// Extend the Restaurant type to include relations and pagination data
interface RestaurantWithRelations extends Restaurant {
    categories: Category[];
    dishes: Dish[];
    dishesTotal: number;
    dishesTotalPages: number;
    dishesCurrentPage: number;
}

/**
 * Custom hook to encapsulate the business logic for RestaurantDetailClient.
 * It provides state and handler functions for adding/deleting categories and dishes,
 * as well as pagination handling. UI components can remain focused on rendering.
 */
export const useRestaurantDetails = (restaurantData: RestaurantWithRelations) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = React.useTransition();

    const categories = restaurantData.categories;
    const dishes = restaurantData.dishes;

    const handleAddCategory = (name: string) => {
        startTransition(async () => {
            try {
                await createCategory(restaurantData.id, name);
                router.refresh();
            } catch (error) {
                console.error("Failed to create category:", error);
            }
        });
    };

    const handleDeleteCategory = (id: string) => {
        startTransition(async () => {
            try {
                await deleteCategory(id);
                router.refresh();
            } catch (error) {
                console.error("Failed to delete category:", error);
            }
        });
    };

    const handleAddDish = (dishData: { name: string; description: string; image: string; spiceLevel: string; categoryIds: string[] }) => {
        startTransition(async () => {
            try {
                await createDish(restaurantData.id, dishData);
                router.refresh();
            } catch (error) {
                console.error("Failed to create dish:", error);
            }
        });
    };

    const handleDeleteDish = (id: string) => {
        startTransition(async () => {
            try {
                await deleteDish(id);
                router.refresh();
            } catch (error) {
                console.error("Failed to delete dish:", error);
            }
        });
    };

    const handleDishesPageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("dishesPage", page.toString());
        router.push(`/restaurants/${restaurantData.id}?${params.toString()}`);
    };

    return {
        categories,
        dishes,
        isPending,
        handleAddCategory,
        handleDeleteCategory,
        handleAddDish,
        handleDeleteDish,
        handleDishesPageChange,
    };
};