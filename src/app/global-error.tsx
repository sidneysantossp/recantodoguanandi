"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Logar o erro para análise
    console.error("Erro global:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Algo deu errado!</h2>
          <p className="mt-2 text-gray-600">
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  )
}