import { Metadata } from "next";
import RestaurantsClient from "@components/Restaurants/RestaurantsClient";
import { getRestaurants } from "@/server/actions/restaurant";

export const metadata: Metadata = {
    title: "Restaurants | Rancelab",
    description: "Manage your restaurant locations",
}

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

const RestaurantsPage = async ({ searchParams }: PageProps) => {
    const params = await searchParams
    const page = Number(params.page) || 1
    const data = await getRestaurants(page, 10)

    return <RestaurantsClient paginationData={data} />
}

export default RestaurantsPage;