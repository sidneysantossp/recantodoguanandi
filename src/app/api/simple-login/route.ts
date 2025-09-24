import { NextRequest, NextResponse } from "next/server"

// API de login MÍNIMA para testes
// Sem dependências, sem complexidade

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 API Simple Login chamada")
    
    // Parse do corpo
    const body = await request.json()
    console.log("📦 Corpo recebido:", body)
    
    const { email, password } = body
    
    // Validação básica
    if (!email || !password) {
      console.log("❌ Email ou senha não fornecidos")
      return NextResponse.json(
        { success: false, message: "Email e senha são obrigatórios" },
        { status: 400 }
      )
    }
    
    // Credenciais fixas para teste
    const TEST_EMAIL = "test@test.com"
    const TEST_PASSWORD = "123"
    const TEST_USER = {
      id: "1",
      email: TEST_EMAIL,
      name: "Usuario Teste",
      role: "ADMIN"
    }
    
    console.log("🔍 Verificando credenciais...")
    
    // Verificação simples
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      console.log("✅ Login bem sucedido!")
      
      return NextResponse.json({
        success: true,
        message: "Login realizado com sucesso",
        user: TEST_USER
      })
    }
    
    console.log("❌ Credenciais incorretas")
    
    return NextResponse.json(
      { success: false, message: "Email ou senha incorretos" },
      { status: 401 }
    )
    
  } catch (error) {
    console.error("💥 ERRO na API Simple Login:", error)
    
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// Método GET para testar se a API está respondendo
export async function GET() {
  console.log("🔍 API Simple Login - GET test")
  
  return NextResponse.json({
    success: true,
    message: "API Simple Login está funcionando",
    timestamp: new Date().toISOString()
  })
}