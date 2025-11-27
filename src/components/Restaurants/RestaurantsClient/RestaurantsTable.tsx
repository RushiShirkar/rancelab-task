import * as React from "react";
import Link from "next/link";
import { Trash2, Share2, Loader2 } from "lucide-react";
import { Button } from "@components/UI/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/UI/Table";
import type { Restaurant } from "@/types";

interface RestaurantsTableProps {
    restaurants: Restaurant[]
    onDelete: (id: string) => void
    onShare: (id: string) => void
    isPending: boolean
}

export default function RestaurantsTable({
    restaurants,
    onDelete,
    onShare,
    isPending,
}: RestaurantsTableProps) {
    return (
        <section className="rounded-md border bg-card relative" aria-label="Restaurants list">
            {isPending && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-md">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {restaurants.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                No restaurants found. Add your first restaurant to get started.
                            </TableCell>
                        </TableRow>
                    ) : (
                        restaurants.map((restaurant) => (
                            <TableRow key={restaurant.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">
                                    <Link
                                        href={`/restaurants/${restaurant.id}`}
                                        className="block hover:text-primary transition-colors focus:outline-none focus:underline"
                                    >
                                        {restaurant.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/restaurants/${restaurant.id}`}
                                        className="block focus:outline-none focus:underline"
                                    >
                                        {restaurant.location}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onShare(restaurant.id)
                                            }}
                                            aria-label={`Share ${restaurant.name}`}
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onDelete(restaurant.id)
                                            }}
                                            aria-label={`Delete ${restaurant.name}`}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </section>
    )
}
