import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Eye, Users } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"

const surveys = [
  {
    id: "1",
    title: "Q1 2025 DEI Assessment",
    description: "Quarterly diversity, equity, and inclusion assessment",
    status: "active",
    responses: 248,
    totalParticipants: 320,
    createdAt: "2024-12-15",
  },
  {
    id: "2",
    title: "Inclusion & Belonging Survey",
    description: "Measure employee sense of belonging and psychological safety",
    status: "active",
    responses: 156,
    totalParticipants: 320,
    createdAt: "2024-12-01",
  },
  {
    id: "3",
    title: "Hiring & Recruitment Feedback",
    description: "Assess diversity in hiring practices and candidate experience",
    status: "closed",
    responses: 302,
    totalParticipants: 320,
    createdAt: "2024-11-01",
  },
  {
    id: "4",
    title: "Pay Equity Survey",
    description: "Anonymous survey to identify compensation disparities",
    status: "draft",
    responses: 0,
    totalParticipants: 0,
    createdAt: "2025-01-05",
  },
]

export default function SurveysPage() {
  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">調査と評価</h1>
              <p className="text-muted-foreground text-lg">
                組織からインサイトを収集するためのDEI調査を作成・管理
              </p>
            </div>
            <Link href="/surveys/create">
              <Button size="lg">
                <PlusCircle />
                調査を作成
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => (
              <Card key={survey.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${survey.status === "active"
                      ? "bg-accent/20 text-accent"
                      : survey.status === "draft"
                        ? "bg-muted text-muted-foreground"
                        : "bg-secondary text-secondary-foreground"
                      }`}
                  >
                    {survey.status === "active" ? "実施中" : survey.status === "draft" ? "下書き" : "終了"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-balance">{survey.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{survey.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {survey.responses}/{survey.totalParticipants}
                    </span>
                  </div>
                  {survey.totalParticipants > 0 && (
                    <span className="text-muted-foreground">
                      {Math.round((survey.responses / survey.totalParticipants) * 100)}% 完了
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/surveys/${survey.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye />
                      表示
                    </Button>
                  </Link>
                  {survey.status !== "draft" && (
                    <Link href={`/surveys/${survey.id}/results`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        結果
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
