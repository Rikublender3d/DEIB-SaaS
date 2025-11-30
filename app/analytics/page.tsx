"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, TrendingDown, Users, Target, Award, Calendar } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  Pie,
  PieChart,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts"

const trendData = [
  { month: "Jul", diversity: 72, inclusion: 84, equity: 78, overall: 78 },
  { month: "Aug", diversity: 73, inclusion: 85, equity: 79, overall: 79 },
  { month: "Sep", diversity: 74, inclusion: 86, equity: 80, overall: 80 },
  { month: "Oct", diversity: 75, inclusion: 87, equity: 81, overall: 81 },
  { month: "Nov", diversity: 76, inclusion: 87, equity: 82, overall: 82 },
  { month: "Dec", diversity: 76, inclusion: 88, equity: 82, overall: 82 },
]

const departmentData = [
  { department: "Engineering", score: 78, employees: 120, change: 3.2 },
  { department: "Sales", score: 84, employees: 85, change: 5.1 },
  { department: "Marketing", score: 88, employees: 45, change: 2.8 },
  { department: "HR", score: 92, employees: 25, change: 1.5 },
  { department: "Finance", score: 81, employees: 30, change: 4.2 },
  { department: "Operations", score: 79, employees: 35, change: -1.2 },
]

const demographicData = [
  { name: "Women", value: 48, count: 154 },
  { name: "Men", value: 50, count: 160 },
  { name: "Non-binary", value: 2, count: 6 },
]

const ethnicityData = [
  { name: "Asian", value: 28, count: 90 },
  { name: "Black/African American", value: 18, count: 58 },
  { name: "Hispanic/Latino", value: 15, count: 48 },
  { name: "White", value: 32, count: 102 },
  { name: "Two or more races", value: 5, count: 16 },
  { name: "Other", value: 2, count: 6 },
]

const seniorityData = [
  { level: "Entry Level", diversity: 82, inclusion: 85, equity: 80 },
  { level: "Mid Level", diversity: 78, inclusion: 86, equity: 82 },
  { level: "Senior", diversity: 72, inclusion: 88, equity: 84 },
  { level: "Leadership", diversity: 65, inclusion: 90, equity: 85 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m")

  const handleExport = () => {
    console.log("[v0] Exporting analytics report")
    // Here you would generate and download a comprehensive report
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">アナリティクスとインサイト</h1>
              <p className="text-muted-foreground text-lg">組織のDEIメトリクスとトレンドを深く分析</p>
            </div>
            <div className="flex gap-2 items-center">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1ヶ月</SelectItem>
                  <SelectItem value="3m">3ヶ月</SelectItem>
                  <SelectItem value="6m">6ヶ月</SelectItem>
                  <SelectItem value="1y">1年</SelectItem>
                  <SelectItem value="all">すべて</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport}>
                <Download />
                レポートをエクスポート
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-accent text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  5.2%
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">総合DEIスコア</h3>
              <p className="text-3xl font-bold tracking-tight">82</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-chart-1/10 rounded-lg">
                  <Users className="h-5 w-5" style={{ color: "hsl(var(--chart-1))" }} />
                </div>
                <div className="flex items-center gap-1 text-accent text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  3.8%
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">多様性インデックス</h3>
              <p className="text-3xl font-bold tracking-tight">76</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-chart-2/10 rounded-lg">
                  <Target className="h-5 w-5" style={{ color: "hsl(var(--chart-2))" }} />
                </div>
                <div className="flex items-center gap-1 text-accent text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  2.1%
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">インクルージョンスコア</h3>
              <p className="text-3xl font-bold tracking-tight">88</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <TrendingUp className="h-5 w-5" style={{ color: "hsl(var(--chart-3))" }} />
                </div>
                <div className="flex items-center gap-1 text-destructive text-sm font-medium">
                  <TrendingDown className="h-4 w-4" />
                  0.5%
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">公平性スコア</h3>
              <p className="text-3xl font-bold tracking-tight">82</p>
            </Card>
          </div>

          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList>
              <TabsTrigger value="trends">トレンド</TabsTrigger>
              <TabsTrigger value="departments">部署</TabsTrigger>
              <TabsTrigger value="demographics">人口統計</TabsTrigger>
              <TabsTrigger value="seniority">職位レベル</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-6">
              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">DEIスコアトレンド</h3>
                  <p className="text-sm text-muted-foreground">全メトリクスにわたる6ヶ月の履歴パフォーマンス</p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[70, 90]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="overall"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Overall"
                    />
                    <Area
                      type="monotone"
                      dataKey="diversity"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Diversity"
                    />
                    <Area
                      type="monotone"
                      dataKey="inclusion"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Inclusion"
                    />
                    <Area
                      type="monotone"
                      dataKey="equity"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      name="Equity"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">月次成長率</h3>
                    <p className="text-sm text-muted-foreground">月次でのスコア改善</p>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="overall"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        name="Overall Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">主要なインサイト</h3>
                    <p className="text-sm text-muted-foreground">注目すべきトレンドと観察結果</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">インクルージョンスコアのピーク</p>
                        <p className="text-sm text-muted-foreground">
                          7月の84から12月に最高スコア88を達成
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
                      <Target className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">一貫した成長</p>
                        <p className="text-sm text-muted-foreground">
                          全メトリクスが6ヶ月間でプラスの傾向を示している
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-chart-1/10 rounded-lg">
                      <Award className="h-5 w-5 mt-0.5" style={{ color: "hsl(var(--chart-1))" }} />
                      <div>
                        <p className="text-sm font-medium mb-1">多様性の改善</p>
                        <p className="text-sm text-muted-foreground">7月以降、多様性インデックスが4ポイント向上</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">部署比較</h3>
                  <p className="text-sm text-muted-foreground">組織内各部署のDEIスコア</p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="department" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="DEI Score" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">部署詳細</h3>
                  <p className="text-sm text-muted-foreground">チーム別の包括的な内訳</p>
                </div>
                <div className="space-y-3">
                  {departmentData.map((dept) => (
                    <div
                      key={dept.department}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-24">
                          <p className="text-sm font-medium">{dept.department}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                              <div className="bg-primary h-full transition-all" style={{ width: `${dept.score}%` }} />
                            </div>
                            <span className="text-sm font-semibold w-8 text-right">{dept.score}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">従業員数</p>
                          <p className="text-sm font-medium">{dept.employees}</p>
                        </div>
                        <div className="text-right w-16">
                          <div
                            className={`text-sm font-medium flex items-center justify-end gap-1 ${dept.change >= 0 ? "text-accent" : "text-destructive"}`}
                          >
                            {dept.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {Math.abs(dept.change)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">性別分布</h3>
                    <p className="text-sm text-muted-foreground">組織全体の性別内訳</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="50%" height={250}>
                      <PieChart>
                        <Pie
                          data={demographicData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          dataKey="value"
                          nameKey="name"
                        >
                          {demographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3 flex-1">
                      {demographicData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{item.count}</p>
                            <p className="text-xs text-muted-foreground">{item.value}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">民族分布</h3>
                    <p className="text-sm text-muted-foreground">人種・民族の多様性の内訳</p>
                  </div>
                  <div className="space-y-3">
                    {ethnicityData.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm truncate">{item.name}</span>
                            <span className="text-sm font-semibold ml-2">{item.value}%</span>
                          </div>
                          <div className="bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full transition-all"
                              style={{
                                width: `${item.value}%`,
                                backgroundColor: COLORS[idx % COLORS.length],
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground w-12 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="seniority" className="space-y-6">
              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">職位レベル別DEIスコア</h3>
                  <p className="text-sm text-muted-foreground">組織階層にわたるパフォーマンスメトリクス</p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={seniorityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="level" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="diversity" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Diversity" />
                    <Bar dataKey="inclusion" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Inclusion" />
                    <Bar dataKey="equity" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Equity" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">職位分析</h3>
                  <p className="text-sm text-muted-foreground">詳細な内訳とインサイト</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">リーダーシップ層の多様性のギャップ</p>
                        <p className="text-sm text-muted-foreground">
                          リーダーシップ層の多様性（65）はエントリーレベル（82）より17ポイント低く、パイプラインの問題を示している
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">全レベルでの強いインクルージョン</p>
                        <p className="text-sm text-muted-foreground">
                          インクルージョンスコアは全職位レベルで高い（85-90）状態を維持
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">職位が上がるにつれて公平性が向上</p>
                        <p className="text-sm text-muted-foreground">
                          公平性の認識はエントリーレベル（80）からリーダーシップ層（85）へと向上
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
