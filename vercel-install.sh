#!/bin/bash

echo "🚀 Instalação para Vercel..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar Prisma Client
echo "🔄 Gerando Prisma Client..."
npx prisma generate

# Build do projeto
echo "🔨 Buildando projeto..."
npm run build

echo "✅ Instalação concluída!"