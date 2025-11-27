import { Skeleton } from "@components/UI/Skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/UI/Table"
import { Button } from "@components/UI/Button"
import { Plus } from "lucide-react"

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Page Header Skeleton */}
            <header className="flex items-start md:items-center justify-between">
                <div>
                    <Skeleton className="h-9 w-48 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <Button disabled className="gap-2 mt-3 opacity-50">
                    <Plus className="h-4 w-4" />
                    Add
                </Button>
            </header>

            {/* Table Skeleton */}
            <section className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="h-5 w-40" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-5 w-64" />
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
            </section>
        </div>
    )
}
