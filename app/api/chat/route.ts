import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// DEIプラットフォーム用のシステムプロンプト
const SYSTEM_PROMPT = `あなたは組織の多様性、公平性、インクルージョン（DEI）を支援するAIエージェントです。

あなたの役割：
- 組織のDEIに関する質問に専門的かつ共感的に答える
- データ駆動型の提案とベストプラクティスを提供する
- 多様性、公平性、インクルージョンに関する知識を共有する
- 具体的な改善策やアクションプランを提案する

応答のスタイル：
- 日本語で丁寧かつ明確に回答する
- データや証拠に基づいた回答を提供する
- 実践的で実行可能なアドバイスを提供する
- 必要に応じて質問をして、より良い理解を促す

あなたは組織のDEI担当者やリーダーをサポートし、より包括的な職場環境の構築を支援します。`

// テスト用のGETエンドポイント
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "APIルートは正常に動作しています",
    apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
  })
}

export async function POST(request: NextRequest) {
  try {
    // APIキーの確認
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set")
      return NextResponse.json(
        {
          error: "APIキーが設定されていません。環境変数 ANTHROPIC_API_KEY を確認してください。",
          details: "API key not configured"
        },
        { status: 500 }
      )
    }

    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          error: "メッセージが正しく送信されませんでした",
          details: "Invalid messages format"
        },
        { status: 400 }
      )
    }

    // メッセージをClaudeの形式に変換（システムメッセージを除く）
    const conversationMessages = messages
      .filter((msg: { role: string; content: string }) => msg.role !== "system")
      .map((msg: { role: string; content: string }) => {
        if (msg.role === "assistant") {
          return {
            role: "assistant" as const,
            content: msg.content,
          }
        }
        return {
          role: "user" as const,
          content: msg.content,
        }
      })

    if (conversationMessages.length === 0) {
      return NextResponse.json(
        {
          error: "有効なメッセージがありません",
          details: "No valid messages"
        },
        { status: 400 }
      )
    }

    console.log("Calling Claude API with", conversationMessages.length, "messages")

    // Claude APIを呼び出し
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: conversationMessages,
    })

    // レスポンスを取得
    const responseText = message.content[0].type === "text" ? message.content[0].text : ""

    if (!responseText) {
      return NextResponse.json(
        {
          error: "AIからの応答が空でした",
          details: "Empty response from Claude"
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      content: responseText,
    })
  } catch (error) {
    console.error("Claude API Error:", error)

    return NextResponse.json(
      {
        error: "AIエージェントの応答中にエラーが発生しました",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

