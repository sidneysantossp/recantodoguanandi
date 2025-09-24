'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CreditCard, 
  UserPlus, 
  FileText, 
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

interface Activity {
  id: string
  type: 'payment' | 'new_user' | 'report' | 'settings'
  title: string
  description: string
  time: string
  status: 'completed' | 'pending' | 'error'
}

interface RecentActivitiesProps {
  userRole?: 'ADMIN' | 'COMMON'
}

export function RecentActivities({ userRole = 'COMMON' }: RecentActivitiesProps) {
  const adminActivities: Activity[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Novo pagamento recebido',
      description: 'João Silva - Mensalidade Novembro',
      time: '2 minutos atrás',
      status: 'completed'
    },
    {
      id: '2',
      type: 'new_user',
      title: 'Novo associado cadastrado',
      description: 'Maria Santos - CPF: ***.***.***-**',
      time: '1 hora atrás',
      status: 'completed'
    },
    {
      id: '3',
      type: 'report',
      title: 'Relatório mensal gerado',
      description: 'Relatório de arrecadação - Novembro/2024',
      time: '3 horas atrás',
      status: 'completed'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Cobrança pendente',
      description: 'Pedro Oliveira - Vencimento: 15/11/2024',
      time: '5 horas atrás',
      status: 'pending'
    }
  ]

  const userActivities: Activity[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Pagamento confirmado',
      description: 'Mensalidade de Novembro - R$ 150,00',
      time: '2 minutos atrás',
      status: 'completed'
    },
    {
      id: '2',
      type: 'settings',
      title: 'Dados atualizados',
      description: 'Informações de contato alteradas',
      time: '2 dias atrás',
      status: 'completed'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Boleto gerado',
      description: 'Mensalidade de Dezembro - R$ 150,00',
      time: '5 dias atrás',
      status: 'pending'
    },
    {
      id: '4',
      type: 'report',
      title: 'Extrato disponível',
      description: 'Extrato de pagamentos - Novembro/2024',
      time: '1 semana atrás',
      status: 'completed'
    }
  ]

  const activities = userRole === 'ADMIN' ? adminActivities : userActivities

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'payment':
        return CreditCard
      case 'new_user':
        return UserPlus
      case 'report':
        return FileText
      case 'settings':
        return Settings
      default:
        return FileText
    }
  }

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'pending':
        return Clock
      case 'error':
        return AlertTriangle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>
          {userRole === 'ADMIN' 
            ? 'Últimas atividades do sistema' 
            : 'Suas atividades recentes'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type)
            const StatusIcon = getStatusIcon(activity.status)
            
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ActivityIcon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <StatusIcon className={`h-3 w-3 ${getStatusColor(activity.status)}`} />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Ver todas as atividades →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}