'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'

interface DashboardCardsProps {
  userRole?: 'ADMIN' | 'COMMON'
}

export function DashboardCards({ userRole = 'COMMON' }: DashboardCardsProps) {
  const adminCards = [
    {
      title: 'Total de Associados',
      value: '156',
      description: 'Associados ativos',
      icon: Users,
      trend: '+12%',
      trendType: 'positive' as const
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 15.420',
      description: 'Arrecadação do mês',
      icon: DollarSign,
      trend: '+8%',
      trendType: 'positive' as const
    },
    {
      title: 'Cobranças Pendentes',
      value: '23',
      description: 'Aguardando pagamento',
      icon: Clock,
      trend: '-5%',
      trendType: 'negative' as const
    },
    {
      title: 'Inadimplência',
      value: '12%',
      description: 'Taxa de inadimplência',
      icon: AlertCircle,
      trend: '-2%',
      trendType: 'positive' as const
    }
  ]

  const userCards = [
    {
      title: 'Status da Mensalidade',
      value: 'Em Dia',
      description: 'Último pagamento: 15/11/2024',
      icon: CheckCircle,
      trend: 'Regular',
      trendType: 'positive' as const
    },
    {
      title: 'Próximo Vencimento',
      value: '15/12/2024',
      description: 'Mensalidade de dezembro',
      icon: Clock,
      trend: 'Em 15 dias',
      trendType: 'neutral' as const
    },
    {
      title: 'Valor Mensal',
      value: 'R$ 150,00',
      description: 'Valor da mensalidade',
      icon: CreditCard,
      trend: 'Fixo',
      trendType: 'neutral' as const
    },
    {
      title: 'Histórico',
      value: '24',
      description: 'Pagamentos realizados',
      icon: TrendingUp,
      trend: '100%',
      trendType: 'positive' as const
    }
  ]

  const cards = userRole === 'ADMIN' ? adminCards : userCards

  const getTrendColor = (trendType: 'positive' | 'negative' | 'neutral') => {
    switch (trendType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getIconColor = (index: number) => {
    const colors = [
      'bg-blue-500 text-white',
      'bg-green-500 text-white',
      'bg-yellow-500 text-white',
      'bg-red-500 text-white'
    ]
    return colors[index] || 'bg-gray-500 text-white'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${getIconColor(index)}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {card.description}
              </p>
              <div className={`text-xs font-medium mt-2 ${getTrendColor(card.trendType)}`}>
                {card.trend}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}