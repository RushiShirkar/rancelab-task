import { Skeleton } from "@components/UI/Skeleton"
import { Button } from "@components/UI/Button"
import { ArrowLeft } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/UI/Table"

export default function RestaurantDetailLoading() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div>
                <Button disabled variant="ghost" className="mb-4 gap-2 pl-0 opacity-50">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Restaurants
                </Button>
                <Skeleton className="h-9 w-64 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>

            {/* Categories Skeleton */}
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-24 rounded-full" />
                ))}
                <Skeleton className="h-6 w-8 rounded-full" />
            </div>

            {/* Dishes Table Skeleton */}
            <div className="rounded-md border bg-card">
                <div className="p-4 border-b flex justify-between items-center">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-9 w-24" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="h-12 w-12 rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-5 w-16" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Skeleton className="h-8 w-8" />
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
