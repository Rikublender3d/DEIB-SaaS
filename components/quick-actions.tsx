import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, PlusCircle, BarChart3, Target } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    icon: FileText,
    title: "調査を作成",
    description: "新しいDEI評価を開始",
    link: "/surveys/create",
  },
  {
    icon: BarChart3,
    title: "レポートを生成",
    description: "分析とインサイトをエクスポート",
    link: "/reports",
  },
  {
    icon: Target,
    title: "目標を設定、確認",
    description: "新しいDEI目標を作る",
    link: "/goals",
  },
]

export function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">クイックアクション</h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Button key={index} variant="outline" className="w-full justify-start h-auto py-3 bg-transparent">
              <Link href={action.link} key={index}>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Link>
            </Button>
          )
        })}
      </div>
    </Card >
  )
}
