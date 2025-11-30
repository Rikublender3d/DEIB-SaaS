import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const FILES_API_BETA_HEADER = "files-api-2025-04-14"

// ファイルのアップロード
export async function POST(request: NextRequest) {
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

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        {
          error: "ファイルが提供されていません",
          details: "No file provided"
        },
        { status: 400 }
      )
    }

    // ファイルサイズチェック（500MB制限）
    const maxSize = 500 * 1024 * 1024 // 500MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "ファイルサイズが大きすぎます。最大500MBまでアップロードできます。",
          details: "File too large"
        },
        { status: 413 }
      )
    }

    console.log("Uploading file:", {
      name: file.name,
      type: file.type,
      size: file.size,
    })

    // ファイルをBufferに変換
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // multipart/form-dataを手動で構築（Node.js環境でより確実）
    const boundary = `----WebKitFormBoundary${Date.now()}`
    const CRLF = '\r\n'

    let body = ''
    body += `--${boundary}${CRLF}`
    body += `Content-Disposition: form-data; name="purpose"${CRLF}`
    body += `${CRLF}user${CRLF}`
    body += `--${boundary}${CRLF}`
    body += `Content-Disposition: form-data; name="file"; filename="${file.name}"${CRLF}`
    body += `Content-Type: ${file.type || 'application/octet-stream'}${CRLF}`
    body += `${CRLF}`

    const bodyBuffer = Buffer.concat([
      Buffer.from(body, 'utf-8'),
      fileBuffer,
      Buffer.from(`${CRLF}--${boundary}--${CRLF}`, 'utf-8'),
    ])

    // Anthropic APIに直接リクエスト
    const response = await fetch('https://api.anthropic.com/v1/files', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': FILES_API_BETA_HEADER,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body: bodyBuffer,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { error: { message: response.statusText } }
      }
      throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    const uploadedFile = await response.json()

    return NextResponse.json({
      id: uploadedFile.id,
      type: uploadedFile.type,
      filename: uploadedFile.filename,
      mime_type: uploadedFile.mime_type,
      size_bytes: uploadedFile.size_bytes,
      created_at: uploadedFile.created_at,
      downloadable: uploadedFile.downloadable,
    })
  } catch (error) {
    console.error("File upload error:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    })

    let errorMessage = "ファイルのアップロード中にエラーが発生しました"
    let statusCode = 500

    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase()

      if (errorMsg.includes("storage limit") || errorMsg.includes("403")) {
        errorMessage = "ストレージ制限に達しました。組織のストレージ制限（100GB）を確認してください。"
        statusCode = 403
      } else if (errorMsg.includes("invalid") || errorMsg.includes("400")) {
        errorMessage = "無効なファイルタイプです。"
        statusCode = 400
      } else if (errorMsg.includes("413") || errorMsg.includes("too large")) {
        errorMessage = "ファイルサイズが大きすぎます。"
        statusCode = 413
      } else if (errorMsg.includes("401") || errorMsg.includes("unauthorized")) {
        errorMessage = "APIキーが無効です。環境変数 ANTHROPIC_API_KEY を確認してください。"
        statusCode = 401
      } else {
        // より詳細なエラーメッセージを返す
        errorMessage = `ファイルのアップロードに失敗しました: ${error.message}`
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined,
      },
      { status: statusCode }
    )
  }
}

// ファイルのリスト取得
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get("id")

    // 特定のファイルの取得
    if (fileId) {
      const file = await (anthropic as any).files.retrieve(fileId, {
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
    }

    // ファイルリストの取得
    const files = await (anthropic as any).files.list({
      headers: {
        "anthropic-beta": FILES_API_BETA_HEADER,
        "anthropic-version": "2023-06-01",
      }
    })

    return NextResponse.json({
      files: files.data.map((file: any) => ({
        id: file.id,
        type: file.type,
        filename: file.filename,
        mime_type: file.mime_type,
        size_bytes: file.size_bytes,
        created_at: file.created_at,
        downloadable: file.downloadable,
      })),
    })
  } catch (error) {
    console.error("File list/retrieve error:", error)

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
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get("id")

    if (!fileId) {
      return NextResponse.json(
        {
          error: "ファイルIDが提供されていません",
          details: "File ID not provided"
        },
        { status: 400 }
      )
    }

    await (anthropic as any).files.delete(fileId, {
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

