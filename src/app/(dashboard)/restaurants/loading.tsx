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
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="w-full md:w-auto">
                    <Skeleton className="h-9 w-40 md:w-48 mb-2" />
                    <Skeleton className="h-5 w-48 md:w-64" />
                </div>
                <Button disabled className="gap-2 opacity-50 w-full md:w-auto">
                    <Plus className="h-4 w-4" />
                    Add
                </Button>
            </header>

            {/* Table Skeleton */}
            <section className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">Name</TableHead>
                            <TableHead className="hidden md:table-cell">Location</TableHead>
                            <TableHead className="hidden md:table-cell text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="h-5 w-32 md:w-40" />
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Skeleton className="h-5 w-48 md:w-64" />
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
