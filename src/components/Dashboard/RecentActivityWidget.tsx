import * as React from "react";
import { Activity } from "lucide-react";
import BaseWidget from "./BaseWidget";
import { Skeleton } from "@components/UI/Skeleton";

interface ActivityItem {
    id: string
    title: string
    description: string
    timestamp: string
}

interface RecentActivityWidgetProps {
    activities?: ActivityItem[]
    isLoading?: boolean
    className?: string
}

const RecentActivityWidget = React.memo(
    ({ activities = [], isLoading, className }: RecentActivityWidgetProps) => {
        if (isLoading) {
            return (
                <BaseWidget
                    title="Recent Activity"
                    icon={Activity}
                    className={className}
                    isLoading
                >
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-3/4" />
                            </div>
                        ))}
                    </div>
                </BaseWidget>
            )
        }

        return (
            <BaseWidget
                title="Recent Activity"
                icon={Activity}
                className={className}
            >
                <div className="space-y-4">
                    {activities.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No recent activity
                        </p>
                    ) : (
                        activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex flex-col space-y-1 pb-4 last:pb-0 border-b last:border-0"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {activity.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.description}
                                        </p>
                                    </div>
                                    <time
                                        className="text-xs text-muted-foreground whitespace-nowrap"
                                        dateTime={activity.timestamp}
                                    >
                                        {activity.timestamp}
                                    </time>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </BaseWidget>
        )
    }
)

export default RecentActivityWidget;