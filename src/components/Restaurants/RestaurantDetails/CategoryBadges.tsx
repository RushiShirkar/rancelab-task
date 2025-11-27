import { Plus, Trash2 } from "lucide-react";
import { Button } from "@components/UI/Button";

interface Category {
    id: string
    name: string
}

interface CategoryBadgesProps {
    categories: Category[]
    onDelete: (id: string) => void
    onAddClick: () => void
}

const CategoryBadges = ({ categories, onDelete, onAddClick }: CategoryBadgesProps) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Categories</h2>
                <Button onClick={onAddClick} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                        No categories yet. Add your first category to get started.
                    </p>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20"
                        >
                            <span className="font-medium">{category.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => onDelete(category.id)}
                            >
                                <Trash2 className="h-3 w-3" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CategoryBadges;