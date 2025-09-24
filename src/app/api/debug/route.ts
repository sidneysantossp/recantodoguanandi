import { NextRequest, NextResponse } from "next/server"

// API MÍNIMA ABSOLUTA - Zero dependências
// Apenas para testar se o servidor Next.js está funcionando

export async function GET() {
  console.log("🔍 DEBUG API - GET chamado")
  
  return NextResponse.json({
    success: true,
    message: "DEBUG API funcionando",
    method: "GET",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "unknown",
    vercel: process.env.VERCEL ? "yes" : "no"
  })
}

export async function POST(request: NextRequest) {
  console.log("🔍 DEBUG API - POST chamado")
  
  try {
    // Apenas retornar o que foi recebido
    const body = await request.json()
    console.log("📦 Body recebido:", body)
    
    return NextResponse.json({
      success: true,
      message: "DEBUG POST funcionando",
      method: "POST",
      received: body,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
      vercel: process.env.VERCEL ? "yes" : "no"
    })
    
  } catch (error) {
    console.error("💥 DEBUG API - Erro:", error)
    
    return NextResponse.json({
      success: false,
      message: "DEBUG API erro",
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}