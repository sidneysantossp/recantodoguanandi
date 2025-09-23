import { PrismaClient } from '@prisma/client'

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
      return inMemoryUsers.find(u => u.email === email)
    }
    
    return null
  } catch (error) {
    // Em caso de erro no banco, usar memória
    if (process.env.NODE_ENV === 'production') {
      return inMemoryUsers.find(u => u.email === email)
    }
    throw error
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