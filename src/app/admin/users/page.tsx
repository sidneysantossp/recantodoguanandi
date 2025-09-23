"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"

interface User {
  id: string
  email: string
  name?: string
  role: "COMMON" | "ADMIN"
}

export const dynamic = 'force-dynamic'

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "ADMIN") {
      router.push("/")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <DashboardLayout user={user || { email: "", role: "ADMIN" }} onLogout={handleLogout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Associados</h1>
          <p className="text-muted-foreground">
            Gerencie os associados da Associação Recanto do Guanandi
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Funcionalidades em Desenvolvimento</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Lista completa de associados</li>
            <li>Cadastro de novos associados</li>
            <li>Edição de dados de associados</li>
            <li>Geração de cobranças PIX</li>
            <li>Filtros e busca avançada</li>
            <li>Exportação de relatórios</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            Esta página está em desenvolvimento. As funcionalidades estarão disponíveis em breve.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}