"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PlusCircle, Target, Calendar, Users, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

const goals = [
  {
    id: "1",
    title: "Increase Women in Engineering to 45%",
    description: "Achieve 45% women representation in engineering roles by end of Q2 2025",
    category: "diversity",
    status: "on-track",
    progress: 68,
    currentValue: "38%",
    targetValue: "45%",
    deadline: "2025-06-30",
    owner: "Sarah Chen, VP Engineering",
    initiatives: 3,
  },
  {
    id: "2",
    title: "Improve Inclusion Score to 90",
    description: "Increase overall inclusion score from 88 to 90 through targeted programs",
    category: "inclusion",
    status: "on-track",
    progress: 80,
    currentValue: "88",
    targetValue: "90",
    deadline: "2025-03-31",
    owner: "Michael Rodriguez, DEI Lead",
    initiatives: 5,
  },
  {
    id: "3",
    title: "Close Gender Pay Gap",
    description: "Reduce gender pay gap to under 2% across all departments",
    category: "equity",
    status: "at-risk",
    progress: 45,
    currentValue: "4.2%",
    targetValue: "<2%",
    deadline: "2025-12-31",
    owner: "Lisa Park, Head of Compensation",
    initiatives: 2,
  },
  {
    id: "4",
    title: "Launch 5 ERG Programs",
    description: "Establish and activate 5 employee resource groups by Q3",
    category: "inclusion",
    status: "on-track",
    progress: 60,
    currentValue: "3",
    targetValue: "5",
    deadline: "2025-09-30",
    owner: "Jordan Kim, Culture Director",
    initiatives: 4,
  },
  {
    id: "5",
    title: "Diverse Leadership Pipeline",
    description: "Ensure 40% of leadership development program participants are from underrepresented groups",
    category: "diversity",
    status: "completed",
    progress: 100,
    currentValue: "42%",
    targetValue: "40%",
    deadline: "2024-12-31",
    owner: "Alex Thompson, Talent Dev",
    initiatives: 2,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-track":
      return "bg-accent/20 text-accent"
    case "at-risk":
      return "bg-destructive/20 text-destructive"
    case "completed":
      return "bg-chart-2/20 text-chart-2"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "on-track":
      return <CheckCircle2 className="h-4 w-4" />
    case "at-risk":
      return <AlertCircle className="h-4 w-4" />
    case "completed":
      return <CheckCircle2 className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function GoalsPage() {
  const [filter, setFilter] = useState("all")
  const [open, setOpen] = useState(false)

  const filteredGoals = filter === "all" ? goals : goals.filter((g) => g.category === filter)

  const stats = {
    total: goals.length,
    onTrack: goals.filter((g) => g.status === "on-track").length,
    atRisk: goals.filter((g) => g.status === "at-risk").length,
    completed: goals.filter((g) => g.status === "completed").length,
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">目標と目的</h1>
              <p className="text-muted-foreground text-lg">DEI目標とイニシアティブを追跡・管理</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <PlusCircle />
                  新しい目標
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>新しい目標を作成</DialogTitle>
                  <DialogDescription>ターゲットとタイムラインを含む新しいDEI目標を設定</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="goal-title">目標タイトル</Label>
                    <Input id="goal-title" placeholder="例: リーダーシップの多様性を増やす" />
                  </div>
                  <div>
                    <Label htmlFor="goal-description">説明</Label>
                    <Textarea id="goal-description" placeholder="目標とその影響を説明..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal-category">カテゴリー</Label>
                      <Select>
                        <SelectTrigger id="goal-category">
                          <SelectValue placeholder="カテゴリーを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diversity">多様性</SelectItem>
                          <SelectItem value="equity">公平性</SelectItem>
                          <SelectItem value="inclusion">インクルージョン</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="goal-deadline">期限</Label>
                      <Input id="goal-deadline" type="date" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal-current">現在の値</Label>
                      <Input id="goal-current" placeholder="例: 35%" />
                    </div>
                    <div>
                      <Label htmlFor="goal-target">目標値</Label>
                      <Input id="goal-target" placeholder="例: 45%" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="goal-owner">目標オーナー</Label>
                    <Input id="goal-owner" placeholder="名前と役職" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={() => setOpen(false)}>目標を作成</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">総目標数</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.total}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">順調</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.onTrack}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">リスク</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.atRisk}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-chart-2/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" style={{ color: "hsl(var(--chart-2))" }} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">完了</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.completed}</p>
            </Card>
          </div>

          <div className="flex gap-2 mb-6">
            <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
              すべての目標
            </Button>
            <Button variant={filter === "diversity" ? "default" : "outline"} onClick={() => setFilter("diversity")}>
              多様性
            </Button>
            <Button variant={filter === "equity" ? "default" : "outline"} onClick={() => setFilter("equity")}>
              公平性
            </Button>
            <Button variant={filter === "inclusion" ? "default" : "outline"} onClick={() => setFilter("inclusion")}>
              インクルージョン
            </Button>
          </div>

          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <Card key={goal.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{goal.title}</h3>
                      <Badge className={getStatusColor(goal.status)}>
                        {getStatusIcon(goal.status)}
                        {goal.status === "on-track" ? "順調" : goal.status === "at-risk" ? "リスク" : "完了"}
                      </Badge>
                      <Badge variant="outline">{goal.category === "diversity" ? "多様性" : goal.category === "equity" ? "公平性" : "インクルージョン"}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">進捗</span>
                      <span className="text-sm font-semibold">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">現在 → 目標</p>
                    <p className="text-sm font-semibold">
                      {goal.currentValue} → {goal.targetValue}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">期限</p>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {goal.owner}
                    </span>
                    <span>{goal.initiatives} イニシアティブ</span>
                  </div>
                  <Link href={`/goals/${goal.id}`}>
                    <Button variant="outline" size="sm">
                      詳細を表示
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
