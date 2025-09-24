"use client"

import { useState } from "react"

// Página de teste MÍNIMA para autenticação
// Sem dependências, sem complexidade

export default function SimpleTestPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      console.log("🚀 Tentando login simples...")
      
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

      setResult(data)

      if (response.ok && data.success) {
        // Salvar no localStorage para teste
        localStorage.setItem("simple_user", JSON.stringify(data.user))
        alert("✅ Login bem sucedido! Usuário salvo no localStorage.")
      } else {
        setError(data.message || "Erro no login")
      }
    } catch (err) {
      console.error("💥 Erro no login:", err)
      setError("Erro de rede: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const testAPI = async () => {
    try {
      console.log("🔍 Testando API...")
      const response = await fetch("/api/simple-login")
      const data = await response.json()
      console.log("📦 Resposta do teste:", data)
      setResult(data)
    } catch (err) {
      console.error("💥 Erro no teste da API:", err)
      setError("Erro ao testar API: " + err.message)
    }
  }

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "monospace",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1>🧪 PÁGINA DE TESTE SIMPLES</h1>
      
      <div style={{ 
        backgroundColor: "#f5f5f5", 
        padding: "15px", 
        borderRadius: "5px",
        marginBottom: "20px"
      }}>
        <h3>🔐 Credenciais de Teste:</h3>
        <p><strong>Email:</strong> test@test.com</p>
        <p><strong>Senha:</strong> 123</p>
      </div>

      <button 
        onClick={testAPI}
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        🔄 Testar API (GET)
      </button>

      <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
        <h3>📝 Formulário de Login:</h3>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "3px"
            }}
            placeholder="test@test.com"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "3px"
            }}
            placeholder="123"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "⏳ Processando..." : "🚀 Fazer Login"}
        </button>
      </form>

      {error && (
        <div style={{ 
          backgroundColor: "#ffebee", 
          color: "#c62828",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px"
        }}>
          <h3>❌ ERRO:</h3>
          <pre>{error}</pre>
        </div>
      )}

      {result && (
        <div style={{ 
          backgroundColor: "#e8f5e8", 
          padding: "15px",
          borderRadius: "5px"
        }}>
          <h3>📊 RESULTADO:</h3>
          <pre style={{ 
            backgroundColor: "#f5f5f5", 
            padding: "10px",
            overflow: "auto"
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ 
        backgroundColor: "#fff3cd", 
        padding: "15px",
        borderRadius: "5px",
        marginTop: "20px"
      }}>
        <h3>🔍 INSTRUÇÕES:</h3>
        <ol>
          <li>Clique em "Testar API" para verificar se a rota está funcionando</li>
          <li>Use as credenciais: test@test.com / 123</li>
          <li>Clique em "Fazer Login"</li>
          <li>Observe o console do navegador (F12) para logs detalhados</li>
          <li>Verifique o resultado abaixo</li>
        </ol>
      </div>
    </div>
  )
}