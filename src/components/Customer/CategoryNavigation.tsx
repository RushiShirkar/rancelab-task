import { Dialog, DialogContent } from "@components/UI/Dialog";
import type { CategoryGroup } from "@/types";

interface CategoryNavigationProps {
    isOpen: boolean
    onClose: () => void
    categoryGroups: CategoryGroup[]
    currentCategoryId: string
    onCategoryClick: (categoryId: string) => void
    getCategoryItemCount: (categoryId: string) => number
}

const CategoryNavigation = ({
    isOpen,
    onClose,
    categoryGroups,
    currentCategoryId,
    onCategoryClick,
    getCategoryItemCount,
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
                            <div className="space-y-2">
                                {group.categories.map((category) => {
                                    const itemCount = getCategoryItemCount(category.id)
                                    const isActive = currentCategoryId === category.id

                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => onCategoryClick(category.id)}
                                            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${isActive
                                                ? "bg-gray-100"
                                                : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="text-gray-700 font-medium">
                                                {category.name}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                {itemCount}
                                            </span>
                                        </button>
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