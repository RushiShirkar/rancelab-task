import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import BaseWidget, { BaseWidgetProps } from "./BaseWidget";
import { Skeleton } from "@components/UI/Skeleton";
import { cn } from "@/lib/utils";

interface MetricWidgetProps extends Omit<BaseWidgetProps, "children"> {
    trend?: {
        value: number
        isPositive: boolean
    }
}

const MetricWidget = React.memo(
    ({ trend, description, isLoading, ...props }: MetricWidgetProps) => {
        if (isLoading) {
            return (
                <BaseWidget {...props} isLoading>
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </BaseWidget>
            )
        }

        const trendContent = trend && (
            <div
                className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                )}
            >
                {trend.isPositive ? (
                    <TrendingUp className="h-3 w-3" aria-hidden="true" />
                ) : (
                    <TrendingDown className="h-3 w-3" aria-hidden="true" />
                )}
                <span>
                    {trend.isPositive ? "+" : ""}
                    {trend.value}%
                </span>
            </div>
        )

        const combinedDescription = (
            <div className="flex items-center gap-2 mt-1">
                {description && (
                    <span className="text-xs text-muted-foreground">{description}</span>
                )}
                {trendContent}
            </div>
        )

        return (
            <BaseWidget {...props} description={undefined}>
                {props.value !== undefined && (
                    <div className="text-2xl font-bold">{props.value}</div>
                )}
                {(description || trend) && combinedDescription}
            </BaseWidget>
        )
    }
)

export default MetricWidget;