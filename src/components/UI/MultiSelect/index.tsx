"use client"

import * as React from "react"
import { Check, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@components/UI/Popover"

interface MultiSelectOption {
    value: string
    label: string
}

interface MultiSelectProps {
    label?: string
    placeholder?: string
    options: MultiSelectOption[]
    value: string[]
    onChange: (value: string[]) => void
    error?: string
    required?: boolean
}

export function MultiSelect({
    label,
    placeholder = "Select items...",
    options,
    value,
    onChange,
    error,
    required,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleToggle = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter((v) => v !== optionValue))
        } else {
            onChange([...value, optionValue])
        }
    }

    const handleRemove = (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation()
        onChange(value.filter((v) => v !== optionValue))
    }

    const selectedLabels = options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label)

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-1.5 text-foreground">
                    {label}
                </label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            error && "border-destructive focus:ring-destructive"
                        )}
                    >
                        <div className="flex flex-wrap gap-1 flex-1 text-left">
                            {value.length === 0 ? (
                                <span className="text-muted-foreground">{placeholder}</span>
                            ) : (
                                selectedLabels.map((label, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                    >
                                        {label}
                                        <X
                                            className="h-3 w-3 cursor-pointer hover:text-primary/80"
                                            onClick={(e) => handleRemove(value[index], e)}
                                        />
                                    </span>
                                ))
                            )}
                        </div>
                        <ChevronDown className={cn("size-4 opacity-50 transition-transform", open && "rotate-180")} />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <div className="max-h-60 overflow-auto p-1">
                        {options.length === 0 ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No options available
                            </div>
                        ) : (
                            options.map((option) => {
                                const isSelected = value.includes(option.value)
                                return (
                                    <div
                                        key={option.value}
                                        onClick={() => handleToggle(option.value)}
                                        className={cn(
                                            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                                            isSelected && "bg-accent"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 flex-1">
                                            <div
                                                className={cn(
                                                    "flex h-4 w-4 items-center justify-center rounded border",
                                                    isSelected
                                                        ? "border-primary bg-primary text-primary-foreground"
                                                        : "border-input"
                                                )}
                                            >
                                                {isSelected && <Check className="h-3 w-3" />}
                                            </div>
                                            <span>{option.label}</span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </PopoverContent>
            </Popover>

            {error && (
                <p className="mt-1.5 text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}
