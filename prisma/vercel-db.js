// Solução para banco de dados em produção no Vercel
// Este arquivo cria um banco de dados SQLite em memória com dados básicos

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

let prisma

// Função para criar banco de dados em memória para produção
async function createProductionDatabase() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  // Criar Prisma Client com configuração para produção
  prisma = new PrismaClient({
    log: [],
  })

  try {
    // Testar conexão
    await prisma.$connect()
    
    // Verificar se há usuários
    const userCount = await prisma.user.count()
    
    if (userCount === 0) {
      // Criar usuários padrão
      const hashedPassword = await bcrypt.hash('123456', 10)
      
      await prisma.user.createMany({
        data: [
          {
            id: '1',
            email: 'admin@recanto.com',
            password: hashedPassword,
            name: 'Administrador',
            role: 'ADMIN',
          },
          {
            id: '2',
            email: 'associado@recanto.com',
            password: hashedPassword,
            name: 'Associado Teste',
            role: 'COMMON',
          },
        ],
      })
      
      console.log('✅ Banco de dados de produção criado com sucesso')
    }
    
    return prisma
  } catch (error) {
    console.error('❌ Erro ao criar banco de dados de produção:', error)
    return null
  }
}

module.exports = { createProductionDatabase }