#!/bin/bash

echo "🚀 Iniciando build para Vercel..."

# Gerar Prisma Client
echo "📦 Gerando Prisma Client..."
npx prisma generate --force

if [ $? -ne 0 ]; then
    echo "❌ Falha ao gerar Prisma Client"
    exit 1
fi

echo "✅ Prisma Client gerado com sucesso"

# Fazer build do Next.js
echo "🔨 Buildando Next.js..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Falha no build do Next.js"
    exit 1
fi

echo "✅ Build concluído com sucesso!"