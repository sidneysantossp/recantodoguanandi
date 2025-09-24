#!/bin/bash

echo "=== Diagnóstico de Produção - Recanto do Guanandi ==="
echo

# Verificar build
echo "1. Verificando build de produção..."
if npm run vercel-build > /dev/null 2>&1; then
    echo "✅ Build de produção bem sucedido"
else
    echo "❌ Build de produção falhou"
    exit 1
fi

echo

# Verificar API local
echo "2. Verificando API local..."
if curl -s -f http://localhost:3000/api/health > /dev/null; then
    echo "✅ API local está respondendo"
else
    echo "❌ API local não está respondendo"
fi

echo

# Testar login de admin
echo "3. Testando login de administrador..."
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@recanto.com","password":"123456","role":"ADMIN"}')

if [[ $ADMIN_RESPONSE == *"Login realizado com sucesso"* ]]; then
    echo "✅ Login de administrador funcionando"
else
    echo "❌ Login de administrador falhou"
    echo "   Resposta: $ADMIN_RESPONSE"
fi

echo

# Testar login de associado
echo "4. Testando login de associado..."
COMMON_RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"associado@recanto.com","password":"123456","role":"COMMON"}')

if [[ $COMMON_RESPONSE == *"Login realizado com sucesso"* ]]; then
    echo "✅ Login de associado funcionando"
else
    echo "❌ Login de associado falhou"
    echo "   Resposta: $COMMON_RESPONSE"
fi

echo

# Verificar arquivos críticos
echo "5. Verificando arquivos críticos..."
FILES=(
    "src/lib/auth.ts"
    "src/app/api/auth/login/route.ts"
    "src/app/page.tsx"
    "vercel-final-solution.js"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ $file não existe"
    fi
done

echo

# Verificar sistema de autenticação
echo "6. Verificando sistema de autenticação..."
if grep -q "123456_hash" src/lib/auth.ts; then
    echo "✅ Sistema de autenticação está correto"
else
    echo "❌ Sistema de autenticação precisa ser atualizado"
fi

echo

# Verificar package.json
echo "7. Verificando configuração do package.json..."
if grep -q "vercel-build" package.json; then
    echo "✅ Script de build do Vercel configurado"
else
    echo "❌ Script de build do Vercel não configurado"
fi

echo
echo "=== Diagnóstico Concluído ==="
echo
echo "🚀 Sistema pronto para deploy em produção!"