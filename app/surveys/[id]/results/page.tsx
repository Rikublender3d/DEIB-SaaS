"use client"

import { use } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Pie, PieChart } from "recharts"
import { Download, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock results data - in real app, fetch from database
const getResultsData = (id: string) => ({
  id,
  title: "Q1 2025 DEI Assessment",
  totalResponses: 248,
  totalParticipants: 320,
  responseRate: 77.5,
  questions: [
    {
      id: "q1",
      text: "How would you rate your sense of belonging at our organization?",
      type: "rating",
      responses: [
        { value: "1", count: 8 },
        { value: "2", count: 18 },
        { value: "3", count: 52 },
        { value: "4", count: 98 },
        { value: "5", count: 72 },
      ],
      average: 3.85,
    },
    {
      id: "q2",
      text: "Do you feel your voice is heard in team meetings?",
      type: "radio",
      responses: [
        { value: "Always", count: 82 },
        { value: "Often", count: 95 },
        { value: "Sometimes", count: 48 },
        { value: "Rarely", count: 18 },
        { value: "Never", count: 5 },
      ],
    },
    {
      id: "q4",
      text: "I believe everyone has equal opportunities for growth and advancement.",
      type: "rating",
      responses: [
        { value: "1", count: 15 },
        { value: "2", count: 28 },
        { value: "3", count: 68 },
        { value: "4", count: 85 },
        { value: "5", count: 52 },
      ],
      average: 3.53,
    },
    {
      id: "q5",
      text: "Which areas need more focus?",
      type: "checkbox",
      responses: [
        { value: "Hiring practices", count: 142 },
        { value: "Promotion processes", count: 168 },
        { value: "Compensation", count: 195 },
        { value: "Training opportunities", count: 128 },
        { value: "Recognition", count: 156 },
      ],
    },
  ],
})

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export default function SurveyResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const results = getResultsData(id)

  const handleExport = () => {
    console.log("[v0] Exporting survey results")
    // Here you would generate and download a report
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">{results.title} - 結果</h1>
            <p className="text-muted-foreground text-lg">調査回答の包括的分析</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/surveys/${id}`}>
              <Button variant="outline">調査を表示</Button>
            </Link>
            <Button onClick={handleExport}>
              <Download />
              レポートをエクスポート
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">総回答数</h3>
            <p className="text-3xl font-bold tracking-tight">{results.totalResponses}</p>
            <p className="text-sm text-muted-foreground mt-1">/ {results.totalParticipants} 参加者</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">回答率</h3>
            <p className="text-3xl font-bold tracking-tight">{results.responseRate}%</p>
            <Progress value={results.responseRate} className="h-2 mt-2" />
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-secondary/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">平均帰属感スコア</h3>
            <p className="text-3xl font-bold tracking-tight">3.85</p>
            <p className="text-sm text-muted-foreground mt-1">/ 5.0</p>
          </Card>
        </div>

        <div className="space-y-6">
          {results.questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  質問 {index + 1}: {question.text}
                </h3>
                {question.average && (
                  <p className="text-sm text-muted-foreground">
                    平均スコア: <span className="font-semibold text-foreground">{question.average.toFixed(2)}</span>{" "}
                    / 5.0
                  </p>
                )}
              </div>

              {(question.type === "rating" || question.type === "radio") && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={question.responses}>
                    <XAxis dataKey="value" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {question.type === "checkbox" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={question.responses}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        dataKey="count"
                        nameKey="value"
                      >
                        {question.responses.map((entry, index) => (
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

                  <div className="space-y-3">
                    {question.responses.map((response, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          />
                          <span className="text-sm">{response.value}</span>
                        </div>
                          <span className="text-sm font-semibold">{response.count} 回答</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
