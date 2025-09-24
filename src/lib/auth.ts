// Sistema de autenticação simplificado para produção
// Funciona mesmo sem banco de dados - 100% independente

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'ADMIN' | 'COMMON'
  createdAt: string
  updatedAt: string
}

// Usuários fixos para todos os ambientes - sem dependência de banco de dados
const USERS: User[] = [
  {
    id: '1',
    email: 'admin@recanto.com',
    password: '123456_hash', // Senha: 123456
    name: 'Administrador',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'associado@recanto.com',
    password: '123456_hash', // Senha: 123456
    name: 'Associado Teste',
    role: 'COMMON',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Função para buscar usuário por email - 100% síncrona
export function getUserByEmail(email: string): User | null {
  try {
    return USERS.find(user => user.email === email) || null
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}

// Função para verificar senha - 100% síncrona e simples
export function verifyPassword(password: string, storedPassword: string): boolean {
  try {
    // Verificação simples para senha 123456
    return password === '123456' && storedPassword === '123456_hash'
  } catch (error) {
    console.error('Erro ao verificar senha:', error)
    return false
  }
}

// Função para autenticar usuário - 100% síncrona
export function authenticateUser(email: string, password: string, role: 'ADMIN' | 'COMMON'): { success: boolean; user?: Omit<User, 'password'>; message?: string } {
  try {
    // Validação básica
    if (!email || !password || !role) {
      return { success: false, message: 'Email, senha e papel são obrigatórios' }
    }
    
    const user = getUserByEmail(email)
    
    if (!user) {
      return { success: false, message: 'Usuário não encontrado' }
    }
    
    if (user.role !== role) {
      return { success: false, message: 'Você não tem permissão para acessar como este tipo de usuário' }
    }
    
    const isPasswordValid = verifyPassword(password, user.password)
    
    if (!isPasswordValid) {
      return { success: false, message: 'Senha incorreta' }
    }
    
    // Retornar usuário sem senha
    const { password: _, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
    
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return { success: false, message: 'Erro interno do servidor' }
  }
}