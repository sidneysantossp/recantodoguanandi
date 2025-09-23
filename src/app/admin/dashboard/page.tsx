"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, DollarSign, CreditCard } from "lucide-react"

interface User {
  id: string
  email: string
  name?: string
  role: "COMMON" | "ADMIN"
}

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
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
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel de administração, {user.name || user.email}
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 45.231,00</div>
              <p className="text-xs text-muted-foreground">
                +20.1% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transações</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.234</div>
              <p className="text-xs text-muted-foreground">
                +19% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+15.3%</div>
              <p className="text-xs text-muted-foreground">
                Em relação ao último trimestre
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos e Tabelas */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Atividades recentes dos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      João Silva fez um pagamento
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Há 2 minutos
                    </p>
                  </div>
                  <div className="font-medium text-green-600">R$ 450,00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Maria Santos cadastrou-se
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Há 15 minutos
                    </p>
                  </div>
                  <div className="font-medium text-blue-600">Novo usuário</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Pedro Oliveira solicitou relatório
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Há 1 hora
                    </p>
                  </div>
                  <div className="font-medium text-purple-600">Relatório</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Sistema</CardTitle>
              <CardDescription>
                Visão geral do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Usuários Ativos</span>
                  <span className="text-sm font-medium">189</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Transações Hoje</span>
                  <span className="text-sm font-medium">67</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Receita Hoje</span>
                  <span className="text-sm font-medium">R$ 3.450,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Taxa de Conversão</span>
                  <span className="text-sm font-medium">4.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}