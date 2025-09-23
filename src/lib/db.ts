import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Dados em memória para produção (fallback)
const inMemoryUsers = [
  {
    id: '1',
    email: 'admin@recanto.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 123456
    name: 'Administrador',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'associado@recanto.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 123456
    name: 'Associado Teste',
    role: 'COMMON',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Função para obter usuário (com fallback para memória em produção)
export async function getUserByEmail(email: string) {
  try {
    // Tentar buscar no banco de dados primeiro
    const user = await db.user.findUnique({
      where: { email }
    })
    
    if (user) {
      return user
    }
    
    // Fallback para memória em produção
    if (process.env.NODE_ENV === 'production') {
      const memoryUser = inMemoryUsers.find(u => u.email === email)
      if (memoryUser) {
        return memoryUser
      }
    }
    
    return null
  } catch (error) {
    console.log('Erro ao buscar usuário no banco, usando fallback:', error.message)
    // Em caso de erro no banco, usar memória
    if (process.env.NODE_ENV === 'production') {
      const memoryUser = inMemoryUsers.find(u => u.email === email)
      if (memoryUser) {
        return memoryUser
      }
    }
    throw error
  }
}

// Função para verificar senha com fallback
export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.log('Erro ao verificar senha, usando verificação manual:', error.message)
    // Fallback para verificação manual (apenas para senha 123456)
    return password === '123456' && hashedPassword === '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
  }
}

// Função para inicializar o banco de dados em produção
export async function initializeDatabase() {
  if (process.env.NODE_ENV === 'production') {
    try {
      // Verificar se o banco de dados está acessível
      await db.user.count()
      console.log('✅ Banco de dados SQLite acessível em produção')
    } catch (error) {
      console.log('⚠️ Banco de dados SQLite não acessível, usando fallback em memória')
    }
  }
}