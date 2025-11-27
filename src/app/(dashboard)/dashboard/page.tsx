import { Store, UtensilsCrossed, FolderTree, FileText } from "lucide-react";
import MetricWidget from "@components/Dashboard/MetricWidget";
import RecentActivityWidget from "@components/Dashboard/RecentActivityWidget";
import { type Metadata } from "next";
import { getDashboardMetrics, getRecentActivities } from "@/server/actions/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Rancelab",
  description: "Dashboard | Rancelab",
};

export default async function DashboardPage() {
  // Fetch dynamic metrics and activities from the database
  const [metrics, recentActivities] = await Promise.all([
    getDashboardMetrics(),
    getRecentActivities(),
  ])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your restaurant management system
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricWidget
          title="Total Restaurants"
          value={metrics.restaurants.value}
          icon={Store}
          description={metrics.restaurants.description}
          href="/restaurants"
        />
        <MetricWidget
          title="Total Dishes"
          value={metrics.dishes.value}
          icon={UtensilsCrossed}
          description={metrics.dishes.description}
        />
        <MetricWidget
          title="Total Categories"
          value={metrics.categories.value}
          icon={FolderTree}
          description={metrics.categories.description}
        />
        <MetricWidget
          title="Active Menus"
          value={metrics.activeMenus.value}
          icon={FileText}
          description={metrics.activeMenus.description}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <RecentActivityWidget
          activities={recentActivities}
          className="lg:col-span-2"
        />
      </div>
    </div>
  )
}