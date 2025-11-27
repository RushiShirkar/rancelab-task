import { Metadata } from "next";
import MenuClient from "@/components/Customer/MenuClient";
import { getPublicRestaurant } from "@/server/actions/restaurant";
import { notFound } from "next/navigation";
import type { MenuCategory, MenuItem, CategoryType, SpiceLevel } from "@/types";

export const metadata: Metadata = {
    title: "Menu | Rancelab",
    description: "Browse our delicious menu",
}

interface PageProps {
    params: Promise<{ restaurantId: string }>
}

const MenuPage = async ({ params }: PageProps) => {
    const { restaurantId } = await params;
    const restaurantData = await getPublicRestaurant(restaurantId);

    if (!restaurantData) {
        notFound()
    }

    // Map DB data to client types
    const categories: MenuCategory[] = restaurantData.categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        type: (c.type as CategoryType) || "main-course",
    }))

    const items: MenuItem[] = restaurantData.dishes.map((d: any) => {
        // Validate image URL - must be absolute URL or start with /
        let validImageUrl: string | null = null
        if (d.imageUrl) {
            const trimmed = d.imageUrl.trim()
            if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
                validImageUrl = trimmed
            }
        }

        return {
            id: d.id,
            name: d.name,
            description: d.description || "",
            price: d.price,
            image: validImageUrl,
            isVegetarian: d.isVegetarian,
            spiceLevel: (d.spiceLevel === 0 ? "None" : d.spiceLevel === 1 ? "Mild" : d.spiceLevel === 2 ? "Medium" : d.spiceLevel === 3 ? "Hot" : "Extra Hot") as SpiceLevel,
            categoryIds: d.categories.map((c: any) => c.id),
        }
    })

    return (
        <MenuClient
            restaurant={restaurantData}
            categories={categories}
            items={items}
        />
    )
}

export default MenuPage;