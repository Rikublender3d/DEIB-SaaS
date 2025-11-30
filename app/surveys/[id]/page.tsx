"use client"

import { use, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock survey data - in real app, fetch from database
const getSurveyData = (id: string) => ({
  id,
  title: "Q1 2025 DEI Assessment",
  description: "Help us understand your experience with diversity, equity, and inclusion at our organization.",
  sections: [
    {
      id: "1",
      title: "Belonging & Inclusion",
      description: "Questions about your sense of belonging",
      questions: [
        {
          id: "q1",
          type: "rating",
          text: "How would you rate your sense of belonging at our organization?",
          required: true,
          scale: { min: 1, max: 5, minLabel: "Not at all", maxLabel: "Very much" },
        },
        {
          id: "q2",
          type: "radio",
          text: "Do you feel your voice is heard in team meetings?",
          required: true,
          options: ["Always", "Often", "Sometimes", "Rarely", "Never"],
        },
        {
          id: "q3",
          type: "text",
          text: "What can we do to improve inclusion in your team?",
          required: false,
        },
      ],
    },
    {
      id: "2",
      title: "Equity & Fairness",
      description: "Questions about fairness and equal opportunities",
      questions: [
        {
          id: "q4",
          type: "rating",
          text: "I believe everyone has equal opportunities for growth and advancement.",
          required: true,
          scale: { min: 1, max: 5, minLabel: "Strongly Disagree", maxLabel: "Strongly Agree" },
        },
        {
          id: "q5",
          type: "checkbox",
          text: "Which areas need more focus? (Select all that apply)",
          required: false,
          options: ["Hiring practices", "Promotion processes", "Compensation", "Training opportunities", "Recognition"],
        },
      ],
    },
  ],
})

export default function TakeSurveyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const survey = getSurveyData(id)
  const [responses, setResponses] = useState<Record<string, string | string[]>>({})
  const [currentSection, setCurrentSection] = useState(0)

  const totalQuestions = survey.sections.reduce((acc, section) => acc + section.questions.length, 0)
  const answeredQuestions = Object.keys(responses).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const handleResponse = (questionId: string, value: string | string[]) => {
    setResponses({ ...responses, [questionId]: value })
  }

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const currentValues = (responses[questionId] as string[]) || []
    const newValues = checked ? [...currentValues, option] : currentValues.filter((v) => v !== option)
    setResponses({ ...responses, [questionId]: newValues })
  }

  const handleSubmit = () => {
    console.log("[v0] Survey responses:", responses)
    // Here you would save to your database
    router.push("/surveys")
  }

  const currentSectionData = survey.sections[currentSection]

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">{survey.title}</h1>
            <p className="text-muted-foreground text-lg">{survey.description}</p>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">進捗</span>
              <span className="text-sm text-muted-foreground">
                {answeredQuestions} / {totalQuestions} 質問
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </Card>

          <Card className="p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                セクション {currentSection + 1}: {currentSectionData.title}
              </h2>
              <p className="text-muted-foreground">{currentSectionData.description}</p>
            </div>

            <div className="space-y-8">
              {currentSectionData.questions.map((question, index) => (
                <div key={question.id} className="pb-6 border-b last:border-b-0">
                  <Label className="text-base font-medium mb-3 block">
                    {index + 1}. {question.text}
                    {question.required && <span className="text-destructive ml-1">*</span>}
                  </Label>

                  {question.type === "rating" && (
                    <div>
                      <RadioGroup
                        value={responses[question.id] as string}
                        onValueChange={(value) => handleResponse(question.id, value)}
                        className="flex gap-2 mt-3"
                      >
                        {Array.from({ length: (question.scale?.max || 5) - (question.scale?.min || 1) + 1 }, (_, i) => {
                          const value = (question.scale?.min || 1) + i
                          return (
                            <div key={value} className="flex flex-col items-center gap-1 flex-1">
                              <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                              <Label htmlFor={`${question.id}-${value}`} className="text-sm font-normal cursor-pointer">
                                {value}
                              </Label>
                            </div>
                          )
                        })}
                      </RadioGroup>
                      {question.scale && (
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>{question.scale.minLabel}</span>
                          <span>{question.scale.maxLabel}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {question.type === "radio" && (
                    <RadioGroup
                      value={responses[question.id] as string}
                      onValueChange={(value) => handleResponse(question.id, value)}
                      className="space-y-2 mt-3"
                    >
                      {question.options?.map((option) => (
                        <div key={option} className="flex items-center gap-2">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`} className="font-normal cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === "checkbox" && (
                    <div className="space-y-2 mt-3">
                      {question.options?.map((option) => {
                        const currentValues = (responses[question.id] as string[]) || []
                        return (
                          <div key={option} className="flex items-center gap-2">
                            <Checkbox
                              id={`${question.id}-${option}`}
                              checked={currentValues.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange(question.id, option, checked === true)}
                            />
                            <Label htmlFor={`${question.id}-${option}`} className="font-normal cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {question.type === "text" && (
                    <Textarea
                      placeholder="回答を入力..."
                      value={(responses[question.id] as string) || ""}
                      onChange={(e) => handleResponse(question.id, e.target.value)}
                      rows={4}
                      className="mt-3"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3">
            {currentSection > 0 && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentSection(currentSection - 1)}
                className="flex-1"
              >
                前のセクション
              </Button>
            )}
            {currentSection < survey.sections.length - 1 ? (
              <Button size="lg" onClick={() => setCurrentSection(currentSection + 1)} className="flex-1">
                次のセクション
              </Button>
            ) : (
              <Button size="lg" onClick={handleSubmit} className="flex-1">
                調査を提出
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
