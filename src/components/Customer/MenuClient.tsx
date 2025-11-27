"use client";

import * as React from "react";
import MenuHeader from "@/components/Customer/MenuHeader";
import DishCard from "@/components/Customer/DishCard";
import FloatingMenuButton from "@/components/Customer/FloatingMenuButton";
import CategoryNavigation from "@/components/Customer/CategoryNavigation";
import type { Restaurant, MenuCategory, MenuItem, CategoryGroup } from "@/types";

interface MenuClientProps {
    restaurant: Restaurant
    categories: MenuCategory[]
    items: MenuItem[]
}

const MenuClient = ({ restaurant, categories, items }: MenuClientProps) => {
    const [currentCategory, setCurrentCategory] = React.useState<string>("")
    const [isNavOpen, setIsNavOpen] = React.useState(false)
    const categoryRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({})

    // Group categories by type
    const categoryGroups: CategoryGroup[] = React.useMemo(() => {
        const groups: CategoryGroup[] = [
            { type: "recommended", label: "Recommended", categories: [] },
            { type: "starter", label: "Starter", categories: [] },
            { type: "desserts", label: "Desserts", categories: [] },
            { type: "main-course", label: "Main Course", categories: [] },
            { type: "drinks", label: "Drinks", categories: [] },
        ]

        categories.forEach((category) => {
            const group = groups.find((g) => g.type === category.type)
            if (group) {
                group.categories.push(category)
            }
        })

        return groups.filter((g) => g.categories.length > 0)
    }, [categories])

    // Get item count for each category
    const getCategoryItemCount = (categoryId: string) => {
        return items.filter((item) =>
            item.categoryIds.includes(categoryId)
        ).length
    }

    // Track scroll position to update current category
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150 // Offset for sticky header

            // Find which category is currently in view
            for (const [categoryId, ref] of Object.entries(categoryRefs.current)) {
                if (ref) {
                    const { offsetTop, offsetHeight } = ref
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setCurrentCategory(categoryId)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Initial call

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Scroll to category
    const scrollToCategory = (categoryId: string) => {
        const ref = categoryRefs.current[categoryId]
        if (ref) {
            const yOffset = -100 // Offset for sticky header
            const y = ref.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: "smooth" })
        }
        setIsNavOpen(false)
    }

    // Get current category name for header
    const currentCategoryName = React.useMemo(() => {
        const category = categories.find((c) => c.id === currentCategory)
        return category?.name || ""
    }, [currentCategory, categories])

    // Get current category type label
    const currentCategoryTypeLabel = React.useMemo(() => {
        const category = categories.find((c) => c.id === currentCategory)
        if (!category) return ""
        const group = categoryGroups.find((g) => g.type === category.type)
        return group?.label || ""
    }, [currentCategory, categories, categoryGroups])

    return (
        <>
            <MenuHeader
                restaurantName={restaurant.name}
                restaurantLocation={restaurant.location}
                currentCategory={currentCategoryName}
                currentCategoryType={currentCategoryTypeLabel}
            />

            <div>
                {categoryGroups.map((group) =>
                    group.categories.map((category, index) => {
                        const categoryItems = items.filter((item) =>
                            item.categoryIds.includes(category.id)
                        )

                        if (categoryItems.length === 0) return null

                        return (
                            <div
                                key={category.id}
                                ref={(el) => {
                                    categoryRefs.current[category.id] = el
                                }}
                                className={index < group.categories.length - 1 ? "pb-2" : "pb-2 border-b border-gray-100"}
                            >
                                {categoryItems.map((item) => (
                                    <DishCard key={item.id} item={item} />
                                ))}
                            </div>
                        )
                    })
                )}
            </div>

            <FloatingMenuButton onClick={() => setIsNavOpen(true)} />

            <CategoryNavigation
                isOpen={isNavOpen}
                onClose={() => setIsNavOpen(false)}
                categoryGroups={categoryGroups}
                currentCategoryId={currentCategory}
                onCategoryClick={scrollToCategory}
                getCategoryItemCount={getCategoryItemCount}
            />
        </>
    )
}

export default MenuClient;