import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const FILES_API_BETA_HEADER = "files-api-2025-04-14"

// 特定のファイルの取得
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

    const file = await (anthropic as any).files.retrieve(id, {
      headers: {
        "anthropic-beta": FILES_API_BETA_HEADER,
        "anthropic-version": "2023-06-01",
      }
    })

    return NextResponse.json({
      id: file.id,
      type: file.type,
      filename: file.filename,
      mime_type: file.mime_type,
      size_bytes: file.size_bytes,
      created_at: file.created_at,
      downloadable: file.downloadable,
    })
  } catch (error) {
    console.error("File retrieve error:", error)

    return NextResponse.json(
      {
        error: "ファイルの取得中にエラーが発生しました",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

// ファイルの削除
export async function DELETE(
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

    await (anthropic as any).files.delete(id, {
      headers: {
        "anthropic-beta": FILES_API_BETA_HEADER,
        "anthropic-version": "2023-06-01",
      }
    })

    return NextResponse.json({
      success: true,
      message: "ファイルが削除されました",
    })
  } catch (error) {
    console.error("File delete error:", error)

    return NextResponse.json(
      {
        error: "ファイルの削除中にエラーが発生しました",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

