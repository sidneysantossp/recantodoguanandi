#!/bin/bash

# Script de preparação para deploy na Vercel

echo "🚀 Preparando projeto para deploy..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+"
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar Prisma Client
echo "🔄 Gerando Prisma Client..."
npx prisma generate

# Verificar se o banco de dados existe
if [ ! -f "./db/custom.db" ]; then
    echo "⚠️  Banco de dados não encontrado. Criando..."
    npx prisma db push
    npx tsx scripts/seed.ts
else
    echo "✅ Banco de dados encontrado"
fi

# Build do projeto
echo "🔨 Buildando projeto..."
npm run build

# Verificar se o build foi bem sucedido
if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo ""
    echo "🎉 Projeto pronto para deploy na Vercel!"
    echo ""
    echo "📋 Próximos passos:"
    echo "1. Faça commit das mudanças:"
    echo "   git add ."
    echo "   git commit -m 'Preparação para deploy'"
    echo ""
    echo "2. Envie para o GitHub:"
    echo "   git push origin main"
    echo ""
    echo "3. Configure na Vercel:"
    echo "   - Importe o repositório"
    echo "   - Adicione a variável DATABASE_URL"
    echo "   - Clique em Deploy"
    echo ""
    echo "📖 Para mais informações, consulte o README.md"
else
    echo "❌ Build falhou. Verifique os erros acima."
    exit 1
fi