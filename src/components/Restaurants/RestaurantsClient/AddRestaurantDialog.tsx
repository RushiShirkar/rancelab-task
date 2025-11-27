import * as React from "react";
import { Button } from "@components/UI/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/UI/Dialog";
import { Input } from "@components/UI/Input";

interface AddRestaurantDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    formData: { name: string; location: string }
    errors: { name: string; location: string }
    isPending: boolean
    onSubmit: (e: React.FormEvent) => void
    onInputChange: (field: "name" | "location") => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AddRestaurantDialog({
    open,
    onOpenChange,
    formData,
    errors,
    isPending,
    onSubmit,
    onInputChange,
}: AddRestaurantDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)}>
                <DialogHeader>
                    <DialogTitle>Add New Restaurant</DialogTitle>
                    <DialogDescription>
                        Enter the details of your new restaurant location.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <Input
                            label="Restaurant Name"
                            placeholder="e.g., Downtown Bistro"
                            value={formData.name}
                            onChange={onInputChange("name")}
                            error={errors.name}
                            required
                        />
                        <Input
                            label="Location"
                            placeholder="e.g., 123 Main St, Downtown"
                            value={formData.location}
                            onChange={onInputChange("location")}
                            error={errors.location}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Adding..." : "Add Restaurant"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
