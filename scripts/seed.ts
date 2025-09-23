import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed do banco de dados...')

  // Criar usuários de teste
  const hashedPassword1 = await bcrypt.hash('123456', 10)
  const hashedPassword2 = await bcrypt.hash('123456', 10)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@recanto.com' },
    update: {},
    create: {
      email: 'admin@recanto.com',
      password: hashedPassword1,
      name: 'Administrador',
      role: 'ADMIN',
    },
  })

  const commonUser = await prisma.user.upsert({
    where: { email: 'associado@recanto.com' },
    update: {},
    create: {
      email: 'associado@recanto.com',
      password: hashedPassword2,
      name: 'Associado Teste',
      role: 'COMMON',
    },
  })

  // Criar associado para o usuário comum
  const associado = await prisma.associado.upsert({
    where: { userId: commonUser.id },
    update: {},
    create: {
      nome: 'Associado',
      sobrenome: 'Teste',
      cpf: '123.456.789-00',
      telefone: '(11) 99999-9999',
      loteNumero: '15',
      loteQuadra: 'A',
      loteLoteamento: 'Recanto do Guanandi',
      loteEndereco: 'Rua Teste, 123',
      loteCidade: 'São Paulo',
      loteEstado: 'SP',
      userId: commonUser.id,
    },
  })

  console.log('Seed concluído!')
  console.log('Usuários criados:')
  console.log('Admin: admin@recanto.com / 123456')
  console.log('Associado: associado@recanto.com / 123456')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })