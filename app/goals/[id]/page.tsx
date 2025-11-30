"use client"

import { use, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, PlusCircle, CheckCircle2, Clock, Users, Calendar, Target, TrendingUp } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import Link from "next/link"

// Mock data - in real app, fetch from database
const getGoalData = (id: string) => ({
  id,
  title: "Increase Women in Engineering to 45%",
  description:
    "Achieve 45% women representation in engineering roles by end of Q2 2025 through targeted recruitment, retention programs, and leadership development.",
  category: "diversity",
  status: "on-track",
  progress: 68,
  currentValue: "38%",
  targetValue: "45%",
  deadline: "2025-06-30",
  owner: "Sarah Chen, VP Engineering",
  createdAt: "2024-07-01",
  initiatives: [
    {
      id: "i1",
      title: "Partner with Women in Tech Organizations",
      description: "Establish partnerships with 5 women-focused tech organizations for recruitment pipeline",
      status: "in-progress",
      progress: 80,
      dueDate: "2025-03-31",
      owner: "Recruiting Team",
      tasks: [
        { id: "t1", text: "Research and identify partner organizations", completed: true },
        { id: "t2", text: "Initiate outreach and establish partnerships", completed: true },
        { id: "t3", text: "Launch joint recruitment events", completed: false },
        { id: "t4", text: "Track and measure pipeline results", completed: false },
      ],
    },
    {
      id: "i2",
      title: "Women in Engineering Mentorship Program",
      description: "Launch mentorship program pairing 25 women engineers with senior leaders",
      status: "in-progress",
      progress: 60,
      dueDate: "2025-04-30",
      owner: "Sarah Chen",
      tasks: [
        { id: "t5", text: "Define program structure and guidelines", completed: true },
        { id: "t6", text: "Recruit mentors from leadership team", completed: true },
        { id: "t7", text: "Match mentors with mentees", completed: false },
        { id: "t8", text: "Launch kickoff and training sessions", completed: false },
      ],
    },
    {
      id: "i3",
      title: "Technical Interview Bias Training",
      description: "Train all technical interviewers on unconscious bias and inclusive hiring practices",
      status: "completed",
      progress: 100,
      dueDate: "2024-12-31",
      owner: "DEI Team",
      tasks: [
        { id: "t9", text: "Develop training curriculum", completed: true },
        { id: "t10", text: "Schedule training sessions", completed: true },
        { id: "t11", text: "Train all interviewers", completed: true },
        { id: "t12", text: "Collect feedback and iterate", completed: true },
      ],
    },
  ],
  progressHistory: [
    { month: "Jul", value: 35 },
    { month: "Aug", value: 35.5 },
    { month: "Sep", value: 36 },
    { month: "Oct", value: 36.5 },
    { month: "Nov", value: 37 },
    { month: "Dec", value: 38 },
  ],
})

export default function GoalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const goal = getGoalData(id)
  const [open, setOpen] = useState(false)

  const completedTasks = goal.initiatives.reduce((acc, init) => acc + init.tasks.filter((t) => t.completed).length, 0)
  const totalTasks = goal.initiatives.reduce((acc, init) => acc + init.tasks.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/goals">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft />
              目標に戻る
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold tracking-tight text-balance">{goal.title}</h1>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={goal.status === "on-track" ? "bg-accent/20 text-accent" : "bg-muted"}>
                  <CheckCircle2 className="h-4 w-4" />
                  順調
                </Badge>
                <Badge variant="outline">{goal.category === "diversity" ? "多様性" : goal.category === "equity" ? "公平性" : "インクルージョン"}</Badge>
              </div>
              <p className="text-muted-foreground text-lg">{goal.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">総合進捗</h3>
            <p className="text-3xl font-bold tracking-tight mb-2">{goal.progress}%</p>
            <Progress value={goal.progress} className="h-2" />
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-chart-1/10 rounded-lg">
                <TrendingUp className="h-5 w-5" style={{ color: "hsl(var(--chart-1))" }} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">現在の値</h3>
            <p className="text-3xl font-bold tracking-tight">{goal.currentValue}</p>
            <p className="text-sm text-muted-foreground mt-1">目標: {goal.targetValue}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Calendar className="h-5 w-5" style={{ color: "hsl(var(--chart-2))" }} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">残り時間</h3>
            <p className="text-3xl font-bold tracking-tight">6</p>
            <p className="text-sm text-muted-foreground mt-1">
              ヶ月（期限: {new Date(goal.deadline).toLocaleDateString()}）
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">進捗トレンド</h3>
                <p className="text-sm text-muted-foreground">時系列での進捗履歴</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={goal.progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[30, 45]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Women in Engineering"]}
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">アクションプランとイニシアティブ</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedTasks} / {totalTasks} タスク完了
                  </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle />
                      イニシアティブを追加
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>新しいイニシアティブを作成</DialogTitle>
                      <DialogDescription>この目標をサポートするアクションプランを追加</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="init-title">イニシアティブタイトル</Label>
                        <Input id="init-title" placeholder="例: 女性向けテック奨学金プログラムを開始" />
                      </div>
                      <div>
                        <Label htmlFor="init-description">説明</Label>
                        <Textarea
                          id="init-description"
                          placeholder="イニシアティブとその目標を説明..."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="init-owner">オーナー</Label>
                          <Input id="init-owner" placeholder="名前またはチーム" />
                        </div>
                        <div>
                          <Label htmlFor="init-due">期限</Label>
                          <Input id="init-due" type="date" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        キャンセル
                      </Button>
                      <Button onClick={() => setOpen(false)}>イニシアティブを作成</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {goal.initiatives.map((initiative) => (
                  <div key={initiative.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{initiative.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              initiative.status === "completed"
                                ? "bg-chart-2/20 text-chart-2 border-chart-2"
                                : initiative.status === "in-progress"
                                  ? "bg-accent/20 text-accent border-accent"
                                  : ""
                            }
                          >
                            {initiative.status === "completed" ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {initiative.status === "completed" ? "完了" : "進行中"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{initiative.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {initiative.owner}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            期限: {new Date(initiative.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Progress value={initiative.progress} className="h-1.5 flex-1" />
                          <span className="text-xs font-medium">{initiative.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pl-1">
                      {initiative.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2">
                          <Checkbox checked={task.completed} />
                          <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">目標詳細</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">オーナー</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {goal.owner}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">作成日</p>
                  <p className="text-sm font-medium">{new Date(goal.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">期限</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">カテゴリー</p>
                  <Badge variant="outline">{goal.category === "diversity" ? "多様性" : goal.category === "equity" ? "公平性" : "インクルージョン"}</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">主要マイルストーン</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-chart-2/20 rounded-full mt-0.5">
                    <CheckCircle2 className="h-3 w-3" style={{ color: "hsl(var(--chart-2))" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">バイアストレーニング完了</p>
                    <p className="text-xs text-muted-foreground">2024年12月</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-accent/20 rounded-full mt-0.5">
                    <Clock className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">パートナーシップ開始</p>
                    <p className="text-xs text-muted-foreground">2025年3月</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-muted rounded-full mt-0.5">
                    <Clock className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">メンターシッププログラム開始</p>
                    <p className="text-xs text-muted-foreground">2025年4月</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-muted rounded-full mt-0.5">
                    <Target className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">45%目標達成</p>
                    <p className="text-xs text-muted-foreground">2025年6月</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
