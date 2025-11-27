"use server"

import { prisma } from "@/server/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getSession } from "@/server/auth"

export async function getRestaurants(page: number = 1, pageSize: number = 10) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const skip = (page - 1) * pageSize

    const [restaurants, total] = await Promise.all([
        prisma.restaurant.findMany({
            where: {
                ownerId: session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: pageSize,
        }),
        prisma.restaurant.count({
            where: {
                ownerId: session.user.id,
            },
        }),
    ])

    return {
        restaurants,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
    }
}

export async function createRestaurant(data: { name: string; location: string }) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Create a slug from the name
    const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4)

    await prisma.restaurant.create({
        data: {
            name: data.name,
            location: data.location,
            slug,
            ownerId: session.user.id,
        },
    })

    revalidatePath("/restaurants")
}

export async function deleteRestaurant(id: string) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Verify ownership
    const restaurant = await prisma.restaurant.findUnique({
        where: { id },
    })

    if (!restaurant || restaurant.ownerId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.restaurant.delete({
        where: { id },
    })

    revalidatePath("/restaurants")
}

export async function getRestaurant(id: string, dishesPage: number = 1, dishesPageSize: number = 10) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const skip = (dishesPage - 1) * dishesPageSize

    const [restaurant, totalDishes] = await Promise.all([
        prisma.restaurant.findUnique({
            where: { id },
            include: {
                categories: {
                    orderBy: { createdAt: "asc" },
                },
                dishes: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        categories: true,
                    },
                    skip,
                    take: dishesPageSize,
                },
            },
        }),
        prisma.dish.count({
            where: { restaurantId: id },
        }),
    ])

    if (!restaurant || restaurant.ownerId !== session.user.id) {
        return null
    }

    return {
        ...restaurant,
        dishesTotal: totalDishes,
        dishesTotalPages: Math.ceil(totalDishes / dishesPageSize),
        dishesCurrentPage: dishesPage,
    }
}

export async function createCategory(restaurantId: string, name: string) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Verify ownership
    const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
    })

    if (!restaurant || restaurant.ownerId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.category.create({
        data: {
            name,
            restaurantId,
        },
    })

    revalidatePath(`/restaurants/${restaurantId}`)
}

export async function deleteCategory(id: string) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Verify ownership through restaurant
    const category = await prisma.category.findUnique({
        where: { id },
        include: { restaurant: true },
    })

    if (!category || category.restaurant.ownerId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.category.delete({
        where: { id },
    })

    revalidatePath(`/restaurants/${category.restaurantId}`)
}

export async function createDish(restaurantId: string, data: {
    name: string
    description: string
    image: string
    spiceLevel: string
    categoryIds: string[]
}) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Verify ownership
    const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
    })

    if (!restaurant || restaurant.ownerId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    // Validate image URL - must be absolute URL or start with /
    let imageUrl: string | null = null
    if (data.image) {
        const trimmedImage = data.image.trim()
        if (trimmedImage.startsWith('http://') || trimmedImage.startsWith('https://') || trimmedImage.startsWith('/')) {
            imageUrl = trimmedImage
        }
    }

    await prisma.dish.create({
        data: {
            name: data.name,
            description: data.description,
            imageUrl: imageUrl,
            spiceLevel: data.spiceLevel === "None" ? 0 : data.spiceLevel === "Mild" ? 1 : data.spiceLevel === "Medium" ? 2 : data.spiceLevel === "Hot" ? 3 : 4, // Simple mapping
            restaurantId,
            categories: {
                connect: data.categoryIds.map((id) => ({ id })),
            },
        },
    })

    revalidatePath(`/restaurants/${restaurantId}`)
}

export async function deleteDish(id: string) {
    const session = await getSession()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Verify ownership
    const dish = await prisma.dish.findUnique({
        where: { id },
        include: { restaurant: true },
    })

    if (!dish || dish.restaurant.ownerId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.dish.delete({
        where: { id },
    })

    revalidatePath(`/restaurants/${dish.restaurantId}`)
}

export async function getPublicRestaurant(idOrSlug: string) {
    console.log("getPublicRestaurant called with:", idOrSlug)
    const restaurant = await prisma.restaurant.findFirst({
        where: {
            OR: [
                { id: idOrSlug },
                { slug: idOrSlug },
            ],
        },
        include: {
            categories: {
                orderBy: { createdAt: "asc" },
            },
            dishes: {
                orderBy: { createdAt: "desc" },
                include: {
                    categories: true,
                },
            },
        },
    })

    console.log("getPublicRestaurant found:", restaurant ? restaurant.id : "null")
    return restaurant
}