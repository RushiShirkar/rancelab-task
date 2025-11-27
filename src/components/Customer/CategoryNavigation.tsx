import { Dialog, DialogContent } from "@components/UI/Dialog";
import type { CategoryGroup, MenuItem } from "@/types";

interface CategoryNavigationProps {
    isOpen: boolean
    onClose: () => void
    categoryGroups: CategoryGroup[]
    currentCategoryId: string
    onCategoryClick: (categoryId: string) => void
    getCategoryItemCount: (categoryId: string) => number
    items: MenuItem[]
}

const CategoryNavigation = ({
    isOpen,
    onClose,
    categoryGroups,
    currentCategoryId,
    onCategoryClick,
    getCategoryItemCount,
    items,
}: CategoryNavigationProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                onClose={onClose}
                className="h-[80vh] w-[320px] overflow-y-auto p-6 pt-8"
            >
                {/* Categories */}
                <div>
                    {categoryGroups.map((group) => (
                        <div key={group.type} className="mb-6 last:mb-0">
                            {/* Group label */}
                            <h3 className="text-center text-[#e91e63] font-semibold text-lg mb-3">
                                {group.label}
                            </h3>

                            {/* Categories in this group */}
                            <div className="space-y-4">
                                {group.categories.map((category) => {
                                    const itemCount = getCategoryItemCount(category.id)
                                    const isActive = currentCategoryId === category.id
                                    const categoryItems = items.filter(item => item.categoryIds.includes(category.id));

                                    return (
                                        <div key={category.id}>
                                            <button
                                                onClick={() => onCategoryClick(category.id)}
                                                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${isActive
                                                    ? "bg-gray-100"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <span className="text-gray-800 font-bold text-lg">
                                                    {category.name}
                                                </span>
                                                <span className="text-gray-500 text-sm">
                                                    {itemCount}
                                                </span>
                                            </button>

                                            {/* Nested Dishes */}
                                            <div className="pl-4 mt-1 space-y-1">
                                                {categoryItems.map(item => (
                                                    <div key={item.id} className="flex justify-between items-center py-1 px-2 text-gray-600 text-sm">
                                                        <span>{item.name}</span>
                                                        <span>{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryNavigation;