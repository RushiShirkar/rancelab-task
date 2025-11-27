import * as React from "react"
import { Button } from "@components/UI/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/UI/Dialog"
import { Input } from "@components/UI/Input"

interface AddCategoryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAdd: (name: string) => void
    isPending: boolean
}

const AddCategoryDialog = ({ open, onOpenChange, onAdd, isPending }: AddCategoryDialogProps) => {
    const [categoryName, setCategoryName] = React.useState("")
    const [error, setError] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!categoryName.trim()) {
            setError("Category name is required")
            return
        }

        onAdd(categoryName)
        setCategoryName("")
        setError("")
    }

    // Close dialog when isPending becomes false after being true
    const prevIsPendingRef = React.useRef(isPending)
    React.useEffect(() => {
        if (prevIsPendingRef.current && !isPending && !categoryName) {
            onOpenChange(false)
        }
        prevIsPendingRef.current = isPending
    }, [isPending, categoryName, onOpenChange])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => !isPending && onOpenChange(false)}>
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Create a new category for organizing your dishes.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <Input
                            label="Category Name"
                            placeholder="e.g., Starters, Main Course, Desserts"
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value)
                                setError("")
                            }}
                            error={error}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Adding..." : "Add Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddCategoryDialog;