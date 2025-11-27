import { Plus, Trash2 } from "lucide-react";
import { Button } from "@components/UI/Button";
import { Card } from "@components/UI/Card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/UI/Table";
import type { Dish, Category } from "@/types";

interface DishesTableProps {
    dishes: Dish[];
    categories: Category[];
    onAddClick: () => void;
    onDelete: (id: string) => void;
}

const DishesTable = ({ dishes, categories, onAddClick, onDelete }: DishesTableProps) => {
    const getCategoryNames = (dish: Dish) => {
        if (dish.categories && dish.categories.length > 0) {
            return dish.categories.map(c => c.name).join(", ");
        }
        if (dish.categoryIds) {
            return dish.categoryIds
                .map(id => categories.find(c => c.id === id)?.name)
                .filter(Boolean)
                .join(", ");
        }
        return "-";
    };

    const getSpiceLevel = (level: number | null | undefined) => {
        if (level === null || level === undefined || level === 0) return "None";
        if (level === 1) return "Mild";
        if (level === 2) return "Medium";
        if (level === 3) return "Hot";
        return "Extra Hot";
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Dishes</h2>
                <Button onClick={onAddClick} className="gap-2">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add</span>
                    <span className="sm:hidden">Add</span>
                </Button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Categories</TableHead>
                            <TableHead>Spice Level</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dishes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No dishes yet. Add your first dish to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            dishes.map(dish => (
                                <TableRow key={dish.id}>
                                    <TableCell className="font-medium">{dish.name}</TableCell>
                                    <TableCell className="max-w-xs truncate">{dish.description}</TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">
                                            {getCategoryNames(dish)}
                                        </span>
                                    </TableCell>
                                    <TableCell>{getSpiceLevel(dish.spiceLevel)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(dish.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {dishes.length === 0 ? (
                    <Card className="p-8 text-center text-muted-foreground">
                        No dishes yet. Add your first dish to get started.
                    </Card>
                ) : (
                    dishes.map(dish => (
                        <Card key={dish.id} className="p-4">
                            <div className="flex justify-between items-start gap-3">
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-semibold text-lg">{dish.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {dish.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <div className="flex items-center gap-1">
                                            <span className="text-muted-foreground">Categories:</span>
                                            <span className="font-medium">{getCategoryNames(dish)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <span className="text-muted-foreground">Spice:</span>
                                        <span className="font-medium">{getSpiceLevel(dish.spiceLevel)}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(dish.id)}
                                    className="shrink-0"
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default DishesTable;