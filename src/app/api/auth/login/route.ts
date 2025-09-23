import { NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { message: "Corpo da requisição inválido" },
        { status: 400 }
      )
    }

    const { email, password, role } = body

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Email, senha e papel são obrigatórios" },
        { status: 400 }
      )
    }

    // Autenticar usuário usando o sistema simplificado
    const result = authenticateUser(email, password, role)

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: "Login realizado com sucesso",
      user: result.user
    })

  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}