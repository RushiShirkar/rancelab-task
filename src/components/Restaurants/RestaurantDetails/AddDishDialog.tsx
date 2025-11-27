"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/UI/Select";
import { MultiSelect } from "@components/UI/MultiSelect";
import { uploadDishImage } from "@/server/actions/upload";
import { SPICE_LEVELS } from "@/content";

interface Category {
    id: string
    name: string
}

interface DishFormData {
    name: string
    description: string
    image: string
    spiceLevel: string
    categoryIds: string[]
}

interface AddDishDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categories: Category[]
    onAdd: (dish: DishFormData) => void
}

const AddDishDialog = ({ open, onOpenChange, categories, onAdd }: AddDishDialogProps) => {
    const [dishForm, setDishForm] = React.useState<DishFormData>({
        name: "",
        description: "",
        image: "",
        spiceLevel: "None",
        categoryIds: [],
    })

    const [errors, setErrors] = React.useState({
        name: "",
        description: "",
        categoryIds: "",
    })

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
    const [imagePreview, setImagePreview] = React.useState<string | null>(null)
    const [isUploading, setIsUploading] = React.useState(false)
    const [uploadError, setUploadError] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (open) {
            setDishForm({
                name: "",
                description: "",
                image: "",
                spiceLevel: "None",
                categoryIds: [],
            })
            setErrors({
                name: "",
                description: "",
                categoryIds: "",
            })
            setSelectedFile(null)
            setImagePreview(null)
            setUploadError(null)
        }
    }, [open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = { name: "", description: "", categoryIds: "" }
        if (!dishForm.name.trim()) {
            newErrors.name = "Dish name is required"
        }
        if (!dishForm.description.trim()) {
            newErrors.description = "Description is required"
        }
        if (dishForm.categoryIds.length === 0) {
            newErrors.categoryIds = "Please select at least one category"
        }

        if (newErrors.name || newErrors.description || newErrors.categoryIds) {
            setErrors(newErrors)
            return
        }

        // Upload image if selected
        let imageUrl = ""
        if (selectedFile) {
            setIsUploading(true)
            setUploadError(null)

            const formData = new FormData()
            formData.append('file', selectedFile)

            const result = await uploadDishImage(formData)
            setIsUploading(false)

            if (!result.success) {
                setUploadError(result.error || "Upload failed")
                return
            }

            imageUrl = result.url || ""
        }

        onAdd({ ...dishForm, image: imageUrl })
        setDishForm({
            name: "",
            description: "",
            image: "",
            spiceLevel: "None",
            categoryIds: [],
        })
        setErrors({ name: "", description: "", categoryIds: "" })
        setSelectedFile(null)
        setImagePreview(null)
        setUploadError(null)
        onOpenChange(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            setUploadError(null)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setSelectedFile(null)
        setImagePreview(null)
        setUploadError(null)
    }

    const categoryOptions = categories.map(cat => ({
        value: cat.id,
        label: cat.name,
    }))

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)} className="w-full md:w-[400px]">
                <DialogHeader>
                    <DialogTitle>Add New Dish</DialogTitle>
                    <DialogDescription>
                        Add a new dish to your menu with all the details.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-2">
                        <Input
                            label="Dish Name"
                            placeholder="e.g., Caesar Salad"
                            value={dishForm.name}
                            onChange={(e) => {
                                setDishForm({ ...dishForm, name: e.target.value })
                                setErrors({ ...errors, name: "" })
                            }}
                            error={errors.name}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground">
                                Description *
                            </label>
                            <textarea
                                placeholder="e.g., Fresh romaine lettuce with parmesan and croutons"
                                value={dishForm.description}
                                onChange={(e) => {
                                    setDishForm({ ...dishForm, description: e.target.value })
                                    setErrors({ ...errors, description: "" })
                                }}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                            {errors.description && (
                                <p className="mt-1.5 text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground">
                                Image
                            </label>
                            {!imagePreview ? (
                                <div className="border-2 border-dashed border-input rounded-md p-4 text-center hover:border-primary transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="dish-image-upload"
                                    />
                                    <label
                                        htmlFor="dish-image-upload"
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                    >
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            Click to upload image
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            PNG, JPG, WebP, GIF (max 5MB)
                                        </span>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative border rounded-md overflow-hidden">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={400}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                            {uploadError && (
                                <p className="mt-1.5 text-sm text-destructive">
                                    {uploadError}
                                </p>
                            )}
                        </div>

                        <Select
                            label="Spice Level"
                            value={dishForm.spiceLevel}
                            onValueChange={(value) => setDishForm({ ...dishForm, spiceLevel: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select spice level" />
                            </SelectTrigger>
                            <SelectContent>
                                {SPICE_LEVELS.map((level) => (
                                    <SelectItem key={level} value={level}>
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <MultiSelect
                            label="Categories *"
                            placeholder="Select categories..."
                            options={categoryOptions}
                            value={dishForm.categoryIds}
                            onChange={(value) => {
                                setDishForm({ ...dishForm, categoryIds: value })
                                setErrors({ ...errors, categoryIds: "" })
                            }}
                            error={errors.categoryIds}
                            required
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isUploading}>
                            {isUploading ? "Uploading..." : "Add Dish"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddDishDialog;