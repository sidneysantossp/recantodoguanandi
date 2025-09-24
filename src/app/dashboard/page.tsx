'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { DashboardCards } from '@/components/dashboard-cards'
import { RecentActivities } from '@/components/recent-activities'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  FileText,
  Plus,
  Download,
  Eye,
  Edit
} from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'COMMON'
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Recuperar informações do usuário do localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        const userData = JSON.parse(userStr)
        setUser(userData)
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error)
      }
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Novo Associado',
      description: 'Cadastrar novo associado',
      icon: Users,
      action: () => {},
      adminOnly: true
    },
    {
      title: 'Gerar Cobrança',
      description: 'Criar nova cobrança',
      icon: CreditCard,
      action: () => {},
      adminOnly: true
    },
    {
      title: 'Novo Relatório',
      description: 'Gerar relatório mensal',
      icon: FileText,
      action: () => {},
      adminOnly: true
    },
    {
      title: 'Ver Pagamentos',
      description: 'Histórico de pagamentos',
      icon: TrendingUp,
      action: () => {},
      adminOnly: false
    }
  ]

  const filteredQuickActions = quickActions.filter(action => {
    if (action.adminOnly && user?.role !== 'ADMIN') {
      return false
    }
    return true
  })

  return (
    <DashboardLayout user={user || undefined} title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo{user ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-blue-100">
            {user?.role === 'ADMIN' 
              ? 'Painel administrativo do Recanto do Guanandi'
              : 'Seu painel de controle financeiro'
            }
          </p>
        </div>

        {/* Dashboard Cards */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Visão Geral</h2>
          <DashboardCards userRole={user?.role} />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredQuickActions.map((action) => {
              const Icon = action.icon
              return (
                <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <RecentActivities userRole={user?.role} />
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Banco de Dados</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Conectado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Último Backup</span>
                  <span className="text-sm text-gray-900">Hoje, 08:00</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Links Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Relatórios
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Dados
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}