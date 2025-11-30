import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const FILES_API_BETA_HEADER = "files-api-2025-04-14"

// ファイルのダウンロード（スキルまたはコード実行ツールによって作成されたファイルのみ）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          error: "APIキーが設定されていません。環境変数 ANTHROPIC_API_KEY を確認してください。",
          details: "API key not configured"
        },
        { status: 500 }
      )
    }

    const { id } = await params

    const fileContent = await (anthropic as any).files.content(id, {
      headers: {
        "anthropic-beta": FILES_API_BETA_HEADER,
        "anthropic-version": "2023-06-01",
      }
    })

    // ファイルコンテンツをストリームとして返す
    return new NextResponse(fileContent as any, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="file_${id}"`,
      },
    })
  } catch (error) {
    console.error("File download error:", error)

    return NextResponse.json(
      {
        error: "ファイルのダウンロード中にエラーが発生しました。ダウンロードできるのは、スキルまたはコード実行ツールによって作成されたファイルのみです。",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

