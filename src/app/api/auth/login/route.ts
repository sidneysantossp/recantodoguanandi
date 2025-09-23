import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

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

    // Buscar usuário no banco de dados
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 401 }
      )
    }

    // Verificar se o papel do usuário corresponde ao papel solicitado
    if (user.role !== role) {
      return NextResponse.json(
        { message: "Você não tem permissão para acessar como este tipo de usuário" },
        { status: 403 }
      )
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Senha incorreta" },
        { status: 401 }
      )
    }

    // Remover a senha do objeto de resposta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login realizado com sucesso",
      user: userWithoutPassword
    })

  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}