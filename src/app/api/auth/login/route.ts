import { NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

// API de login simplificada para produção
export async function POST(request: NextRequest) {
  try {
    // Parse do corpo da requisição
    const body = await request.json()
    
    // Validação básica
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { message: "Corpo da requisição inválido" },
        { status: 400 }
      )
    }

    const { email, password, role } = body

    // Verificar campos obrigatórios
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

    // Retornar sucesso
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