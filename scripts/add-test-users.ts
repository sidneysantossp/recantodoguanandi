import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()
import bcrypt from "bcryptjs"

async function addTestUsers() {
  try {
    // Hash da senha "123456"
    const hashedPassword = await bcrypt.hash("123456", 10)

    // Criar usuário comum
    const commonUser = await db.user.upsert({
      where: { email: "associado@recanto.com" },
      update: {},
      create: {
        email: "associado@recanto.com",
        password: hashedPassword,
        name: "João Associado",
        role: "COMMON"
      }
    })

    // Criar usuário admin
    const adminUser = await db.user.upsert({
      where: { email: "admin@recanto.com" },
      update: {},
      create: {
        email: "admin@recanto.com",
        password: hashedPassword,
        name: "Maria Administradora",
        role: "ADMIN"
      }
    })

    console.log("Usuários de teste criados com sucesso:")
    console.log("Usuário comum:", commonUser)
    console.log("Usuário admin:", adminUser)
    console.log("\nSenha para ambos: 123456")

  } catch (error) {
    console.error("Erro ao criar usuários de teste:", error)
  } finally {
    await db.$disconnect()
  }
}

addTestUsers()