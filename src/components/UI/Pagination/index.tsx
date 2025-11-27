import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@components/UI/Button";

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Show pagination info even if only one page
    if (totalPages <= 0) return null

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (currentPage > 3) {
                pages.push("...")
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push("...")
            }

            // Always show last page
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="flex items-center justify-end pt-6 gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                aria-label="First page"
            >
                <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                                ...
                            </span>
                        )
                    }

                    return (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => onPageChange(page as number)}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </Button>
                    )
                })}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
            >
                <ChevronsRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
