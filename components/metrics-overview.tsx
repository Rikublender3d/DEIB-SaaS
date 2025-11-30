import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Target, Award } from "lucide-react"

const metrics = [
  {
    title: "総合DEIスコア",
    value: "82",
    change: "+5.2%",
    trend: "up",
    icon: Award,
  },
  {
    title: "多様性スコア",
    value: "76",
    change: "+3.8%",
    trend: "up",
    icon: Users,
  },
  {
    title: "インクルージョンスコア",
    value: "88",
    change: "+2.1%",
    trend: "up",
    icon: Target,
  },
  {
    title: "調査回答率",
    value: "94%",
    change: "+1.3%",
    trend: "up",
    icon: TrendingUp,
  },
]

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-accent">{metric.change}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</h3>
            <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
          </Card>
        )
      })}
    </div>
  )
}
