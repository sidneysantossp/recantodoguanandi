'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Mail,
  Phone,
  Calendar,
  CreditCard
} from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'COMMON'
}

interface Associado {
  id: string
  name: string
  email: string
  phone: string
  status: 'ativo' | 'inativo' | 'pendente'
  joinDate: string
  lastPayment: string
  monthlyFee: number
}

export default function AssociadosPage() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [associados, setAssociados] = useState<Associado[]>([])

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

    // Dados mock de associados
    const mockAssociados: Associado[] = [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-8888',
        status: 'ativo',
        joinDate: '2023-01-15',
        lastPayment: '2024-11-15',
        monthlyFee: 150.00
      },
      {
        id: '2',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '(11) 98888-7777',
        status: 'ativo',
        joinDate: '2023-03-20',
        lastPayment: '2024-11-10',
        monthlyFee: 150.00
      },
      {
        id: '3',
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@email.com',
        phone: '(11) 97777-6666',
        status: 'pendente',
        joinDate: '2023-06-10',
        lastPayment: '2024-10-15',
        monthlyFee: 150.00
      },
      {
        id: '4',
        name: 'Ana Costa',
        email: 'ana.costa@email.com',
        phone: '(11) 96666-5555',
        status: 'inativo',
        joinDate: '2023-02-28',
        lastPayment: '2024-08-15',
        monthlyFee: 150.00
      },
      {
        id: '5',
        name: 'Carlos Ferreira',
        email: 'carlos.ferreira@email.com',
        phone: '(11) 95555-4444',
        status: 'ativo',
        joinDate: '2023-04-05',
        lastPayment: '2024-11-12',
        monthlyFee: 150.00
      }
    ]

    setAssociados(mockAssociados)
  }, [])

  const getStatusColor = (status: Associado['status']) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800'
      case 'inativo':
        return 'bg-red-100 text-red-800'
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredAssociados = associados.filter(associado =>
    associado.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    associado.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <DashboardLayout user={user || undefined} title="Gestão de Associados">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Associados</h1>
            <p className="text-gray-600">Gerencie todos os associados da associação</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Associado
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{associados.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {associados.filter(a => a.status === 'ativo').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {associados.filter(a => a.status === 'pendente').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inativos</p>
                  <p className="text-2xl font-bold text-red-600">
                    {associados.filter(a => a.status === 'inativo').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-red-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Associados Cadastrados</CardTitle>
            <CardDescription>Lista completa de associados da associação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar associado por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtrar</Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Associado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contato</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Último Pagamento</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Mensalidade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssociados.map((associado) => (
                    <tr key={associado.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {associado.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{associado.name}</p>
                            <p className="text-sm text-gray-600">ID: {associado.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-900">{associado.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">{associado.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(associado.status)}>
                          {associado.status.charAt(0).toUpperCase() + associado.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-900">{associado.lastPayment}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <CreditCard className="h-3 w-3 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            R$ {associado.monthlyFee.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAssociados.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum associado encontrado com os filtros atuais.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}