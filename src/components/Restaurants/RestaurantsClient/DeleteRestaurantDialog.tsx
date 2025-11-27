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

interface DeleteRestaurantDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    isPending: boolean
    onConfirm: () => void
}

export default function DeleteRestaurantDialog({
    open,
    onOpenChange,
    isPending,
    onConfirm,
}: DeleteRestaurantDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)}>
                <DialogHeader>
                    <DialogTitle>Delete Restaurant</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this restaurant? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
