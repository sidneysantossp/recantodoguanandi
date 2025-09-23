"use client"

import { ReactNode } from "react"
import { SidebarNav } from "./sidebar-nav"
import { Navbar } from "./navbar"

interface DashboardLayoutProps {
  children: ReactNode
  user: {
    name?: string
    email: string
    role: "COMMON" | "ADMIN"
  }
  onLogout?: () => void
}

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  const isAdmin = user.role === "ADMIN"

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <SidebarNav isAdmin={isAdmin} onLogout={onLogout} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar user={user} onLogout={onLogout} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}