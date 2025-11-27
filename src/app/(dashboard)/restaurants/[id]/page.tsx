import { Metadata } from "next";
import RestaurantDetailClient from "@components/Restaurants/RestaurantDetails";
import { getRestaurant } from "@/server/actions/restaurant";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Restaurant Details | Rancelab",
    description: "Manage categories and dishes for your restaurant",
}

interface PageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ dishesPage?: string }>
}

const RestaurantDetailPage = async ({ params, searchParams }: PageProps) => {
    const { id } = await params
    const search = await searchParams
    const dishesPage = Number(search.dishesPage) || 1
    const restaurant = await getRestaurant(id, dishesPage, 10)

    if (!restaurant) {
        notFound()
    }

    return <RestaurantDetailClient restaurantData={restaurant} />
}

export default RestaurantDetailPage;