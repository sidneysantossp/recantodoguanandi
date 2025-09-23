#!/bin/bash

echo "🚀 Iniciando deploy para Vercel..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ package.json não encontrado. Execute este script no diretório raiz do projeto."
    exit 1
fi

# Limpar caches
echo "🧹 Limpando caches..."
rm -rf .next node_modules/.prisma

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Build do projeto
echo "🏗️ Buildando projeto..."
npm run build

# Verificar se a build foi bem sucedida
if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo ""
    echo "📋 Informações para deploy:"
    echo "- Banco de dados: SQLite com fallback em memória"
    echo "- Usuários padrão criados automaticamente"
    echo "- Login: admin@recanto.com / 123456 (Admin)"
    echo "- Login: associado@recanto.com / 123456 (Associado)"
    echo ""
    echo "🚀 Pronto para deploy no Vercel!"
    echo ""
    echo "Comandos para deploy:"
    echo "1. Se for a primeira vez: vercel"
    echo "2. Se já tiver projeto: vercel --prod"
else
    echo "❌ Falha na build. Verifique os erros acima."
    exit 1
fi