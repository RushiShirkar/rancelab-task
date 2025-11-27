"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@components/UI/Button";
import { Pagination } from "@components/UI/Pagination";
import type { Restaurant } from "@/types";
import { useRestaurants } from "@/hooks/useRestaurants";
import AddRestaurantDialog from "./AddRestaurantDialog";
import DeleteRestaurantDialog from "./DeleteRestaurantDialog";
import RestaurantsTable from "./RestaurantsTable";

interface RestaurantsClientProps {
    paginationData: {
        restaurants: Restaurant[]
        total: number
        totalPages: number
        currentPage: number
    }
}

export default function RestaurantsClient({ paginationData }: RestaurantsClientProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const {
        isPending,
        isDialogOpen,
        setIsDialogOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        formData,
        errors,
        handleSubmit,
        handleDelete,
        confirmDelete,
        handleShare,
        handleInputChange
    } = useRestaurants()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        router.push(`/restaurants?${params.toString()}`)
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <header className="flex items-start md:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Restaurants</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your restaurants
                    </p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)} className="gap-2 mt-3">
                    <Plus className="h-4 w-4" />
                    Add
                </Button>
            </header>

            {/* Restaurants Table */}
            <RestaurantsTable
                restaurants={paginationData.restaurants}
                onDelete={handleDelete}
                onShare={handleShare}
                isPending={isPending}
            />

            {/* Pagination */}
            <Pagination
                currentPage={paginationData.currentPage}
                totalPages={paginationData.totalPages}
                onPageChange={handlePageChange}
            />

            {/* Add Restaurant Dialog */}
            <AddRestaurantDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                formData={formData}
                errors={errors}
                isPending={isPending}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteRestaurantDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                isPending={isPending}
                onConfirm={confirmDelete}
            />
        </div>
    )
}