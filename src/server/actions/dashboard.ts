"use server"

import { prisma } from "@/server/db"
import { getSession } from "@/server/auth"
import { formatDistanceToNow } from "date-fns"

export async function getDashboardMetrics() {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Fetch all counts in parallel for better performance
    const [restaurantCount, dishCount, categoryCount] = await Promise.all([
        prisma.restaurant.count({
            where: {
                ownerId: session.user.id,
            },
        }),
        prisma.dish.count({
            where: {
                restaurant: {
                    ownerId: session.user.id,
                },
            },
        }),
        prisma.category.count({
            where: {
                restaurant: {
                    ownerId: session.user.id,
                },
            },
        }),
    ])

    return {
        restaurants: {
            value: restaurantCount,
            description: "Active locations",
        },
        dishes: {
            value: dishCount,
            description: "Menu items",
        },
        categories: {
            value: categoryCount,
            description: "Food categories",
        },
        activeMenus: {
            value: restaurantCount, // Active menus = restaurants with published menus
            description: "Published menus",
        },
    }
}

export async function getRecentActivities() {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Fetch latest items from each category
    const [restaurants, dishes, categories] = await Promise.all([
        prisma.restaurant.findMany({
            where: { ownerId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, name: true, createdAt: true },
        }),
        prisma.dish.findMany({
            where: { restaurant: { ownerId: session.user.id } },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, name: true, createdAt: true, restaurant: { select: { name: true } } },
        }),
        prisma.category.findMany({
            where: { restaurant: { ownerId: session.user.id } },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, name: true, createdAt: true, restaurant: { select: { name: true } } },
        }),
    ])

    // Normalize and combine activities
    const activities = [
        ...restaurants.map((r: { id: string; name: string; createdAt: Date }) => ({
            id: `rest-${r.id}`,
            title: "New restaurant added",
            description: `${r.name} was added to the system`,
            timestamp: r.createdAt,
            rawDate: r.createdAt,
        })),
        ...dishes.map((d: { id: string; name: string; createdAt: Date; restaurant: { name: string } }) => ({
            id: `dish-${d.id}`,
            title: "Dish created",
            description: `New dish '${d.name}' added to ${d.restaurant.name}`,
            timestamp: d.createdAt,
            rawDate: d.createdAt,
        })),
        ...categories.map((c: { id: string; name: string; createdAt: Date; restaurant: { name: string } }) => ({
            id: `cat-${c.id}`,
            title: "Category created",
            description: `New category '${c.name}' added to ${c.restaurant.name}`,
            timestamp: c.createdAt,
            rawDate: c.createdAt,
        })),
    ]

    // Sort by date (newest first) and take top 10
    return activities
        .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
        .slice(0, 4)
        .map(activity => ({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            timestamp: formatDistanceToNow(activity.timestamp, { addSuffix: true }),
        }))
}