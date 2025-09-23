"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  CreditCard,
  TrendingUp,
  HelpCircle,
  LogOut
} from "lucide-react"

interface SidebarNavProps {
  isAdmin?: boolean
  onLogout?: () => void
}

const menuItems = {
  common: [
    {
      title: "Dashboard",
      href: "/user/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Minhas Finanças",
      href: "/user/finances",
      icon: CreditCard,
    },
    {
      title: "Relatórios",
      href: "/user/reports",
      icon: FileText,
    },
    {
      title: "Ajuda",
      href: "/user/help",
      icon: HelpCircle,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Usuários",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Finanças",
      href: "/admin/finances",
      icon: CreditCard,
    },
    {
      title: "Relatórios",
      href: "/admin/reports",
      icon: TrendingUp,
    },
    {
      title: "Configurações",
      href: "/admin/settings",
      icon: Settings,
    },
  ],
}

export function SidebarNav({ isAdmin = false, onLogout }: SidebarNavProps) {
  const pathname = usePathname()
  const items = isAdmin ? menuItems.admin : menuItems.common

  return (
    <nav className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {isAdmin ? "Painel Admin" : "Painel do Associado"}
        </h2>
      </div>
      
      <div className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </button>
      </div>
    </nav>
  )
}