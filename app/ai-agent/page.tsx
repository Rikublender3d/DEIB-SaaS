"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Send, User, Paperclip, X } from "lucide-react"

interface UploadedFile {
  id?: string
  filename: string
  mime_type: string
  size_bytes: number
  content?: string // CSVファイルなどの場合、内容を直接保存
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string | Array<{ type: string; text?: string; source?: { type: string; file_id: string } }>
  timestamp: Date
  files?: UploadedFile[]
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "こんにちは！DEIプラットフォームのAIエージェントです。組織の多様性、公平性、インクルージョンに関する質問やサポートが必要なことがあれば、お気軽にお聞きください。",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    try {
      // CSVファイルの場合は内容を読み込んでテキストとして扱う
      const isCSV = file.name.toLowerCase().endsWith('.csv') ||
        file.type === 'text/csv' ||
        file.type === 'application/csv'

      if (isCSV) {
        // CSVファイルの内容をテキストとして読み込む
        const text = await file.text()
        const uploadedFile: UploadedFile = {
          filename: file.name,
          mime_type: 'text/csv',
          size_bytes: file.size,
          content: text,
        }
        setUploadedFiles((prev) => [...prev, uploadedFile])
      } else {
        // その他のファイルはFiles APIにアップロード
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/files", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "ファイルのアップロードに失敗しました")
        }

        const uploadedFile = await response.json()
        setUploadedFiles((prev) => [...prev, uploadedFile])
      }
    } catch (error) {
      console.error("File upload error:", error)
      alert(error instanceof Error ? error.message : "ファイルのアップロードに失敗しました")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
    // 同じファイルを再度選択できるようにリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (fileIdOrFilename: string) => {
    setUploadedFiles((prev) => prev.filter((f) => {
      // idがある場合はidで比較、ない場合はfilenameで比較（CSVファイルなど）
      return f.id ? f.id !== fileIdOrFilename : f.filename !== fileIdOrFilename
    }))
  }

  const handleSend = async () => {
    if ((!input.trim() && uploadedFiles.length === 0) || isLoading) return

    // メッセージコンテンツの構築
    const contentBlocks: Array<{ type: string; text?: string; source?: { type: string; file_id: string } }> = []

    // テキストがある場合は追加
    if (input.trim()) {
      contentBlocks.push({
        type: "text",
        text: input.trim(),
      })
    }

    // アップロードされたファイルを追加
    for (const file of uploadedFiles) {
      const mimeType = file.mime_type

      // CSVファイルの場合は内容をテキストとして含める
      if (file.content && (mimeType === "text/csv")) {
        contentBlocks.push({
          type: "text",
          text: `以下はCSVファイル「${file.filename}」の内容です:\n\n${file.content}`,
        })
      }
      else if (file.id && (mimeType === "application/pdf" || mimeType.startsWith("text/"))) {
        contentBlocks.push({
          type: "document",
          source: {
            type: "file",
            file_id: file.id,
          },
        })
      }
      else if (file.id && mimeType.startsWith("image/")) {
        contentBlocks.push({
          type: "image",
          source: {
            type: "file",
            file_id: file.id,
          },
        })
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: contentBlocks.length > 0 ? contentBlocks : input.trim(),
      timestamp: new Date(),
      files: [...uploadedFiles],
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setUploadedFiles([])
    setIsLoading(true)

    try {
      // API呼び出し
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((msg) => msg.role === "user" || (msg.role === "assistant" && msg.id !== "1")) // 初期メッセージを除外
            .map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
        }),
      })

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` }
        }
        const errorMessage = errorData.error || errorData.details || "APIリクエストに失敗しました"
        throw new Error(errorMessage)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      let errorContent = "エラーが発生しました。もう一度お試しください。"

      if (error instanceof Error) {
        errorContent = `エラーが発生しました: ${error.message}`

        // より詳細なエラーメッセージ
        if (error.message.includes("APIキー")) {
          errorContent = "APIキーの設定に問題があります。環境変数 ANTHROPIC_API_KEY を確認してください。"
        } else if (error.message.includes("レート制限")) {
          errorContent = "レート制限に達しました。しばらく待ってから再試行してください。"
        }
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">AIエージェント</h1>
            <p className="text-muted-foreground text-lg">
              DEIに関する質問に答え、組織の多様性、公平性、インクルージョンの改善をサポートします
            </p>
          </div>

          <Card className="flex flex-col h-[calc(100vh-240px)] min-h-[600px] p-0">
            {/* メッセージ表示エリア */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                      }`}
                  >
                    {typeof message.content === "string" ? (
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    ) : (
                      <div className="space-y-2">
                        {message.content.map((block, idx) => (
                          <div key={idx}>
                            {block.type === "text" && (
                              <p className="text-sm whitespace-pre-wrap break-words">{block.text}</p>
                            )}
                            {block.type === "document" && (
                              <div className="text-xs opacity-80 mt-1">
                                📄 ドキュメント: {message.files?.find(f => f.id === block.source?.file_id)?.filename || "ファイル"}
                              </div>
                            )}
                            {block.type === "image" && (
                              <div className="text-xs opacity-80 mt-1">
                                🖼️ 画像: {message.files?.find(f => f.id === block.source?.file_id)?.filename || "ファイル"}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {message.files && message.files.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-current/20">
                        <div className="text-xs opacity-80">
                          添付ファイル: {message.files.map(f => {
                            const isCSV = f.filename.toLowerCase().endsWith('.csv')
                            return isCSV ? `📊 ${f.filename}` : f.filename
                          }).join(", ")}
                        </div>
                      </div>
                    )}
                    <p
                      className={`text-xs mt-2 ${message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                        }`}
                    >
                      {message.timestamp.toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 入力エリア */}
            <div className="border-t p-4">
              {/* アップロードされたファイルの表示 */}
              {uploadedFiles.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={file.id || `${file.filename}-${index}`}
                      className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-sm"
                    >
                      {file.filename.toLowerCase().endsWith('.csv') ? (
                        <span className="text-xs">📊</span>
                      ) : (
                        <Paperclip className="h-3 w-3" />
                      )}
                      <span className="max-w-[200px] truncate">{file.filename}</span>
                      <button
                        onClick={() => removeFile(file.id || file.filename)}
                        className="hover:opacity-70"
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2 items-end">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
                  disabled={isLoading || isUploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isUploading}
                  className="h-[60px] w-[60px] flex-shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="メッセージを入力... (Enterで送信、Shift+Enterで改行)"
                    rows={1}
                    className="min-h-[60px] max-h-[200px] resize-none"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={(!input.trim() && uploadedFiles.length === 0) || isLoading || isUploading}
                  size="lg"
                  className="h-[60px] px-6"
                >
                  {isUploading ? (
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}