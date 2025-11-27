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
}

const AddCategoryDialog = ({ open, onOpenChange, onAdd }: AddCategoryDialogProps) => {
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
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)}>
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
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Add Category</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddCategoryDialog;