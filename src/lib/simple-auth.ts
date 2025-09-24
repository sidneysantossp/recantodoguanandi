// Sistema de autenticação MÍNIMO para testes
// Sem dependências, sem complexidade

export interface SimpleUser {
  id: string
  email: string
  name: string
  role: string
}

// Usuário fixo para teste
const TEST_USER: SimpleUser = {
  id: "1",
  email: "test@test.com",
  name: "Usuario Teste",
  role: "ADMIN"
}

// Senha fixa para teste
const TEST_PASSWORD = "123"

// Função de autenticação super simples
export function simpleAuth(email: string, password: string): { success: boolean; user?: SimpleUser; message?: string } {
  console.log("🔍 Tentativa de login:", { email, password })
  
  // Verificação básica
  if (!email || !password) {
    console.log("❌ Email ou senha vazios")
    return { success: false, message: "Email e senha são obrigatórios" }
  }
  
  // Verificação de credenciais
  if (email === TEST_USER.email && password === TEST_PASSWORD) {
    console.log("✅ Login bem sucedido")
    return { 
      success: true, 
      user: TEST_USER 
    }
  }
  
  console.log("❌ Credenciais incorretas")
  return { success: false, message: "Email ou senha incorretos" }
}

// Função para verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const user = localStorage.getItem('simple_user')
  return !!user
}

// Função para obter usuário atual
export function getCurrentUser(): SimpleUser | null {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('simple_user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// Função para logout
export function logout(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('simple_user')
  console.log("🚪 Usuário deslogado")
}