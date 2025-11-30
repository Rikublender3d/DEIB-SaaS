"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, TrendingUp, Eye } from "lucide-react"
import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"

const reports = [
  {
    id: "1",
    title: "Q4 2024 DEI Comprehensive Report",
    description: "Full quarterly analysis including survey results, analytics, and recommendations",
    type: "quarterly",
    date: "2024-12-31",
    size: "2.4 MB",
    pages: 45,
    status: "ready",
  },
  {
    id: "2",
    title: "Gender Pay Equity Analysis",
    description: "Detailed compensation analysis across gender and ethnicity demographics",
    type: "custom",
    date: "2024-12-15",
    size: "1.8 MB",
    pages: 28,
    status: "ready",
  },
  {
    id: "3",
    title: "Hiring Diversity Report 2024",
    description: "Annual review of recruitment practices and candidate diversity metrics",
    type: "annual",
    date: "2024-12-01",
    size: "3.2 MB",
    pages: 52,
    status: "ready",
  },
  {
    id: "4",
    title: "November Department Scorecard",
    description: "Monthly performance metrics for all departments",
    type: "monthly",
    date: "2024-11-30",
    size: "892 KB",
    pages: 18,
    status: "ready",
  },
  {
    id: "5",
    title: "Q1 2025 DEI Comprehensive Report",
    description: "Full quarterly analysis including survey results and analytics",
    type: "quarterly",
    date: "2025-03-31",
    size: "—",
    pages: 0,
    status: "scheduled",
  },
]

const templates = [
  {
    id: "t1",
    name: "Quarterly DEI Report",
    description: "Comprehensive analysis of all DEI metrics for the quarter",
    includes: ["Survey results", "Trend analysis", "Department breakdown", "Recommendations"],
  },
  {
    id: "t2",
    name: "Annual DEI Summary",
    description: "Year-end comprehensive report with historical comparisons",
    includes: ["Year-over-year trends", "Goal progress", "Success stories", "Strategic planning"],
  },
  {
    id: "t3",
    name: "Pay Equity Analysis",
    description: "Detailed compensation analysis to identify disparities",
    includes: ["Salary bands", "Gender pay gap", "Ethnicity analysis", "Recommendations"],
  },
  {
    id: "t4",
    name: "Custom Report",
    description: "Build your own report with selected metrics and time ranges",
    includes: ["Flexible metrics", "Custom date range", "Department filters", "Export options"],
  },
]

export default function ReportsPage() {
  const [filterType, setFilterType] = useState("all")

  const filteredReports = filterType === "all" ? reports : reports.filter((r) => r.type === filterType)

  const handleDownload = (reportId: string) => {
    console.log("[v0] Downloading report:", reportId)
    // Here you would generate and download the report
  }

  const handleGenerate = (templateId: string) => {
    console.log("[v0] Generating report from template:", templateId)
    // Here you would open a form to configure and generate the report
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">レポートとエクスポート</h1>
            <p className="text-muted-foreground text-lg">包括的なDEIレポートを生成・ダウンロード</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">生成済みレポート</h2>
                  <p className="text-sm text-muted-foreground">以前に生成したレポートをダウンロード・表示</p>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのタイプ</SelectItem>
                    <SelectItem value="quarterly">四半期</SelectItem>
                    <SelectItem value="monthly">月次</SelectItem>
                    <SelectItem value="annual">年次</SelectItem>
                    <SelectItem value="custom">カスタム</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold mb-1 truncate">{report.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{report.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.date).toLocaleDateString()}
                        </span>
                        {report.status === "ready" && (
                          <>
                            <span>{report.size}</span>
                            <span>{report.pages} ページ</span>
                          </>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${report.status === "ready" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                            }`}
                        >
                          {report.status === "ready" ? "準備完了" : "スケジュール済み"}
                        </span>
                      </div>
                    </div>
                    {report.status === "ready" && (
                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm">
                          <Eye />
                          プレビュー
                        </Button>
                        <Button size="sm" onClick={() => handleDownload(report.id)}>
                          <Download />
                          ダウンロード
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1">クイック統計</h2>
                <p className="text-sm text-muted-foreground">レポート生成概要</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">総レポート数</span>
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">今四半期</span>
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">スケジュール済み</span>
                    <Calendar className="h-4 w-4 text-foreground" />
                  </div>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">レポートテンプレート</h2>
              <p className="text-sm text-muted-foreground">テンプレートのいずれかを使用して新しいレポートを生成</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="p-4 border rounded-lg hover:border-primary transition-colors">
                  <h3 className="text-base font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">含まれるもの:</p>
                    <div className="flex flex-wrap gap-2">
                      {template.includes.map((item, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => handleGenerate(template.id)}>
                    <FileText />
                    レポートを生成
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
