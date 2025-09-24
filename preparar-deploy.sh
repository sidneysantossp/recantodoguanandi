#!/bin/bash

echo "🚀 Preparando deploy para produção..."
echo

# Limpar tudo
echo "🧹 Limpando caches e arquivos temporários..."
rm -rf .next
rm -rf node_modules/.prisma
rm -rf dist
rm -rf build

# Instalar dependências
echo "📦 Instalando dependências..."
npm install --production

# Build de produção
echo "🔨 Buildando para produção..."
npm run vercel-build

if [ $? -eq 0 ]; then
    echo "✅ Build de produção concluído com sucesso!"
    echo
    echo "🎯 Sistema pronto para deploy!"
    echo
    echo "📋 Próximos passos:"
    echo "1. Faça commit das alterações:"
    echo "   git add ."
    echo "   git commit -m 'Sistema 100% pronto para produção'"
    echo "   git push origin main"
    echo
    echo "2. No Vercel:"
    echo "   - Aguarde o build automático"
    echo "   - Verifique se não há erros"
    echo "   - Teste a aplicação em produção"
    echo
    echo "🔐 Credenciais para teste:"
    echo "   Admin: admin@recanto.com / 123456"
    echo "   Associado: associado@recanto.com / 123456"
else
    echo "❌ Falha no build de produção"
    exit 1
fi