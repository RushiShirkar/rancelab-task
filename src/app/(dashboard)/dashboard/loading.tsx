import { Skeleton } from "@components/UI/Skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@components/UI/Card"

export default function DashboardLoading() {
    return (
        <div className="space-y-6">
            {/* Page Header Skeleton */}
            <div>
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-5 w-64" />
            </div>

            {/* Metrics Grid Skeleton */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <Skeleton className="h-4 w-24" />
                            </CardTitle>
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16 mb-1" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Skeleton */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-32" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="ml-4 space-y-1">
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-3 w-32" />
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
