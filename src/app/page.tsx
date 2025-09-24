"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { useToast } from "@/hooks/use-toast"
import { TreePine, DollarSign } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (email: string, password: string, role: "COMMON" | "ADMIN") => {
    setIsLoading(true)
    
    try {
      console.log("🚀 Tentando login com:", { email, role })
      
      const response = await fetch("/api/simple-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      console.log("📡 Status da resposta:", response.status)
      
      const data = await response.json()
      console.log("📦 Resposta recebida:", data)

      if (response.ok && data.success) {
        // Armazenar informações do usuário no localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${data.user.name || data.user.email}!`,
        })
        
        // Redirecionar para o dashboard apropriado
        if (role === "ADMIN") {
          router.push("/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          title: "Erro de autenticação",
          description: data.message || "Email ou senha incorretos.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("💥 Erro no login:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="p-2 bg-green-600 rounded-lg">
            <TreePine className="h-8 w-8 text-white" />
          </div>
          <div className="p-2 bg-emerald-600 rounded-lg">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Recanto do Guanandi</h1>
        <p className="text-lg md:text-xl text-gray-600">Plataforma de Gestão Financeira</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-gray-600">
        <p>© 2024 Associação Recanto do Guanandi</p>
        <p className="text-sm mt-1">Sistema de Gestão Financeira</p>
      </footer>
    </div>
  )
}