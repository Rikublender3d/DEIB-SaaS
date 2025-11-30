import { Card } from "@/components/ui/card"
import { FileText, Users, Award, TrendingUp } from "lucide-react"

const activities = [
  {
    icon: FileText,
    title: "Q4 DEI調査完了",
    description: "248件の回答を収集",
    time: "2時間前",
  },
  {
    icon: Users,
    title: "新しいメンターシッププログラム開始",
    description: "52名が参加登録",
    time: "1日前",
  },
  {
    icon: Award,
    title: "多様性目標達成",
    description: "エンジニアリングチームが40%の目標に到達",
    time: "3日前",
  },
  {
    icon: TrendingUp,
    title: "インクルージョンスコア向上",
    description: "前四半期から5ポイント上昇",
    time: "1週間前",
  },
]

export function RecentActivity() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">最近のアクティビティ</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-0.5">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
