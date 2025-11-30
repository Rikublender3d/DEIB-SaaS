import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { DiversityChart } from "@/components/diversity-chart"
import { InclusionScore } from "@/components/inclusion-score"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">DEI Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Track and improve your organization's diversity, equity, and inclusion initiatives
          </p>
        </div>

        <MetricsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <DiversityChart />
          </div>
          <div>
            <InclusionScore />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentActivity />
          <QuickActions />
        </div>
      </main>
    </div>
  )
}
