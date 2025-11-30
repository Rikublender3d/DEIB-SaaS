"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, X, GripVertical } from "lucide-react"
import { useRouter } from "next/navigation"

type QuestionType = "text" | "radio" | "checkbox" | "select" | "rating"

interface Question {
  id: string
  type: QuestionType
  text: string
  required: boolean
  options?: string[]
  scale?: { min: number; max: number; minLabel?: string; maxLabel?: string }
}

export default function CreateSurveyPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "radio",
      text: "How would you rate your sense of belonging at our organization?",
      required: true,
      scale: { min: 1, max: 5, minLabel: "Not at all", maxLabel: "Very much" },
    },
  ])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "text",
      text: "",
      required: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question) {
      const newOptions = [...(question.options || []), ""]
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex)
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const handleSave = (status: "draft" | "active") => {
    console.log("[v0] Saving survey:", { title, description, questions, status })
    // Here you would save to your database
    router.push("/surveys")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">調査を作成</h1>
          <p className="text-muted-foreground text-lg">DEI評価調査をデザイン</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">調査タイトル</Label>
              <Input
                id="title"
                placeholder="例: 2025年Q1 DEI評価"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                placeholder="この調査の目的を説明..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-move" />
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <Label>質問 {index + 1}</Label>
                      <Input
                        placeholder="質問を入力..."
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeQuestion(question.id)} className="mt-6">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="flex-1">
                      <Label>質問タイプ</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value: QuestionType) => updateQuestion(question.id, { type: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">テキスト回答</SelectItem>
                          <SelectItem value="radio">選択式（単一）</SelectItem>
                          <SelectItem value="checkbox">選択式（複数）</SelectItem>
                          <SelectItem value="select">ドロップダウン</SelectItem>
                          <SelectItem value="rating">評価スケール</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Checkbox
                        id={`required-${question.id}`}
                        checked={question.required}
                        onCheckedChange={(checked) => updateQuestion(question.id, { required: checked === true })}
                      />
                      <Label htmlFor={`required-${question.id}`} className="text-sm font-normal cursor-pointer">
                        必須
                      </Label>
                    </div>
                  </div>

                  {(question.type === "radio" || question.type === "checkbox" || question.type === "select") && (
                    <div>
                      <Label>選択肢</Label>
                      <div className="space-y-2 mt-2">
                        {(question.options || []).map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2">
                            <Input
                              placeholder={`選択肢 ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeOption(question.id, optionIndex)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                          <PlusCircle className="h-4 w-4" />
                          選択肢を追加
                        </Button>
                      </div>
                    </div>
                  )}

                  {question.type === "rating" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>スケール</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="number"
                            placeholder="最小"
                            value={question.scale?.min || 1}
                            onChange={(e) =>
                              updateQuestion(question.id, {
                                scale: { min: Number.parseInt(e.target.value) || 1, max: question.scale?.max || 5 },
                              })
                            }
                          />
                          <Input
                            type="number"
                            placeholder="最大"
                            value={question.scale?.max || 5}
                            onChange={(e) =>
                              updateQuestion(question.id, {
                                scale: { min: question.scale?.min || 1, max: Number.parseInt(e.target.value) || 5 },
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label>ラベル（オプション）</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            placeholder="最小ラベル"
                            value={question.scale?.minLabel || ""}
                            onChange={(e) =>
                              updateQuestion(question.id, {
                                scale: {
                                  min: question.scale?.min || 1,
                                  max: question.scale?.max || 5,
                                  minLabel: e.target.value,
                                  maxLabel: question.scale?.maxLabel,
                                },
                              })
                            }
                          />
                          <Input
                            placeholder="最大ラベル"
                            value={question.scale?.maxLabel || ""}
                            onChange={(e) =>
                              updateQuestion(question.id, {
                                scale: {
                                  min: question.scale?.min || 1,
                                  max: question.scale?.max || 5,
                                  minLabel: question.scale?.minLabel,
                                  maxLabel: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button variant="outline" size="lg" onClick={addQuestion} className="w-full mt-4 bg-transparent">
          <PlusCircle />
          質問を追加
        </Button>

        <div className="flex gap-3 mt-8">
          <Button variant="outline" size="lg" onClick={() => router.push("/surveys")} className="flex-1">
            キャンセル
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleSave("draft")} className="flex-1">
            下書き保存
          </Button>
          <Button size="lg" onClick={() => handleSave("active")} className="flex-1">
            調査を公開
          </Button>
        </div>
      </div>
    </div>
  )
}
