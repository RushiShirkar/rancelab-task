import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRestaurant, deleteRestaurant } from "@/server/actions/restaurant";

export function useRestaurants() {
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    const [restaurantToDelete, setRestaurantToDelete] = React.useState<string | null>(null)
    const [formData, setFormData] = React.useState({ name: "", location: "" })
    const [errors, setErrors] = React.useState({ name: "", location: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        const newErrors = { name: "", location: "" }
        if (!formData.name.trim()) {
            newErrors.name = "Restaurant name is required"
        }
        if (!formData.location.trim()) {
            newErrors.location = "Location is required"
        }

        if (newErrors.name || newErrors.location) {
            setErrors(newErrors)
            return
        }

        startTransition(async () => {
            try {
                await createRestaurant(formData)
                setFormData({ name: "", location: "" })
                setErrors({ name: "", location: "" })
                setIsDialogOpen(false)
                router.refresh()
            } catch (error) {
                console.error("Failed to create restaurant:", error)
                toast.error("Failed to create restaurant")
            }
        })
    }

    const handleDelete = (id: string) => {
        setRestaurantToDelete(id)
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (!restaurantToDelete) return

        startTransition(async () => {
            try {
                await deleteRestaurant(restaurantToDelete)
                router.refresh()
                toast.success("Restaurant deleted successfully")
            } catch (error) {
                console.error("Failed to delete restaurant:", error)
                toast.error("Failed to delete restaurant")
            } finally {
                setDeleteDialogOpen(false)
                setRestaurantToDelete(null)
            }
        })
    }

    const handleShare = (restaurantId: string) => {
        const url = `${window.location.origin}/menu/${restaurantId}`
        navigator.clipboard.writeText(url)
        toast.success("Public menu link copied to clipboard!")
    }

    const handleInputChange = (field: "name" | "location") => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, [field]: e.target.value })
        setErrors({ ...errors, [field]: "" })
    }

    return {
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
    }
}
