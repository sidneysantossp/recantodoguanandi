export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Página não encontrada</h1>
      <p className="mt-4 text-lg text-gray-600">
        A página que você está procurando não existe.
      </p>
      <a 
        href="/" 
        className="mt-6 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Voltar para o início
      </a>
    </div>
  )
}