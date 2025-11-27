import * as React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/UI/Card";
import { cn } from "@/lib/utils";

export interface BaseWidgetProps {
    title: string
    value?: string | number
    icon?: LucideIcon
    description?: string
    href?: string
    children?: React.ReactNode
    footer?: React.ReactNode
    className?: string
    isLoading?: boolean
}

const BaseWidget = React.memo(
    ({
        title,
        value,
        icon: Icon,
        description,
        href,
        children,
        footer,
        className,
        isLoading = false,
    }: BaseWidgetProps) => {
        const cardContent = (
            <>
                {children || (
                    <>
                        {value !== undefined && (
                            <div className="text-2xl font-bold">{value}</div>
                        )}
                        {description && (
                            <CardDescription className="mt-1">
                                {description}
                            </CardDescription>
                        )}
                    </>
                )}
            </>
        )

        const content = (
            <Card
                className={cn(
                    "transition-all",
                    href && "cursor-pointer hover:shadow-md hover:border-primary/50",
                    className
                )}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
                    <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
                    {Icon && (
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    )}
                </CardHeader>
                <CardContent>
                    {cardContent}
                </CardContent>
                {footer && <CardFooter>{footer}</CardFooter>}
            </Card>
        )

        if (href) {
            return (
                <Link
                    href={href}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                >
                    {content}
                </Link>
            )
        }

        return content
    }
)

export default BaseWidget;