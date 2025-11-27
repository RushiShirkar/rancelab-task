"use client";

import * as React from "react";
import Image from "next/image";
import type { MenuItem } from "@/types";
import { Flame } from "lucide-react";
import { getPlaceholderImage, truncateText } from "@/lib/utils";

interface DishCardProps {
    item: MenuItem
}

const DESCRIPTION_MAX_LENGTH = 150

const spiceLevelMap: Record<string, number> = {
    Mild: 1,
    Medium: 2,
    Hot: 3,
    "Extra Hot": 4,
}

const DishCard = ({ item }: DishCardProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false)

    const shouldTruncate = item.description.length > DESCRIPTION_MAX_LENGTH
    const displayDescription = isExpanded
        ? item.description
        : truncateText(item.description, DESCRIPTION_MAX_LENGTH)

    const spiceLevelCount = item.spiceLevel ? spiceLevelMap[item.spiceLevel] || 0 : 0

    return (
        <article className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex gap-3">
                {/* Left side - Content */}
                <div className="flex-1 min-w-0">
                    {/* Veg/Non-veg indicator and spice level */}
                    <div className="flex items-center gap-2 mb-1">
                        {/* Veg/Non-veg dot */}
                        <div
                            className={`w-3 h-3 rounded-full ${item.isVegetarian ? "bg-green-600" : "bg-red-600"
                                }`}
                            role="img"
                            aria-label={item.isVegetarian ? "Vegetarian" : "Non-vegetarian"}
                        />

                        {/* Spice level indicators */}
                        {spiceLevelCount > 0 && (
                            <div className="flex gap-0.5" role="img" aria-label={`Spice level: ${item.spiceLevel}`}>
                                {Array.from({ length: spiceLevelCount }).map((_, i) => (
                                    <Flame key={i} className="w-3 h-3 fill-red-500 text-red-500" aria-hidden="true" />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dish name */}
                    <h3 className="text-base font-semibold text-gray-800 mb-1">{item.name}</h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {displayDescription}
                        {shouldTruncate && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="ml-1 text-gray-800 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded"
                                aria-expanded={isExpanded}
                            >
                                {isExpanded ? "read less" : "read more"}
                            </button>
                        )}
                    </p>
                </div>

                {/* Right side - Image */}
                <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative">
                        <Image
                            src={item?.image || getPlaceholderImage()}
                            alt={`${item.name} - ${item.isVegetarian ? "Vegetarian" : "Non-vegetarian"} dish`}
                            fill
                            sizes="96px"
                            className="object-cover"
                            onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement
                                target.src = getPlaceholderImage()
                            }}
                        />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default DishCard;