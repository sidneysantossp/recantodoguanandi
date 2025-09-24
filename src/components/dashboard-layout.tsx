'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'COMMON'
}

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  user?: User
}

const menuItems = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    href: '/dashboard',
    description: 'Visão geral do sistema'
  },
  { 
    title: 'Associados', 
    icon: Users, 
    href: '/associados',
    description: 'Gestão de associados',
    adminOnly: true
  },
  { 
    title: 'Financeiro', 
    icon: CreditCard, 
    href: '/financeiro',
    description: 'Controle financeiro'
  },
  { 
    title: 'Relatórios', 
    icon: FileText, 
    href: '/relatorios',
    description: 'Relatórios e estatísticas'
  },
  { 
    title: 'Configurações', 
    icon: Settings, 
    href: '/configuracoes',
    description: 'Configurações do sistema'
  }
]

export function DashboardLayout({ children, title = 'Dashboard', user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Verificar se o usuário está logado
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/')
      return
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && user?.role !== 'ADMIN') {
      return false
    }
    return true
  })

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Recanto do Guanandi</h1>
              <p className="text-sm text-gray-600">Sistema Financeiro</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors group"
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div>{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </a>
              )
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.role === 'ADMIN' ? 'Administrador' : 'Associado'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">
                  {user?.role === 'ADMIN' ? 'Painel Administrativo' : 'Painel do Associado'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}