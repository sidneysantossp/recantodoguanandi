#!/bin/bash

echo "🔍 INVESTIGAÇÃO DO ERRO DE PRODUÇÃO"
echo "=================================="
echo

# Substitua pela URL real do seu site no Vercel
VERCEL_URL="https://seu-site.vercel.app"

if [ -z "$1" ]; then
  echo "❌ Por favor, forneça a URL do seu site no Vercel"
  echo "Uso: $0 https://seu-site.vercel.app"
  exit 1
fi

VERCEL_URL="$1"

echo "🌐 Testando URL: $VERCEL_URL"
echo

echo "1. 🔍 Testando se o site está no ar..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL")
if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Site está no ar (Status: $HTTP_CODE)"
else
  echo "❌ Site não está respondendo (Status: $HTTP_CODE)"
fi

echo
echo "2. 🔍 Testando API simples (GET)..."
API_RESPONSE=$(curl -s "$VERCEL_URL/api/simple-login")
echo "Resposta: $API_RESPONSE"

if echo "$API_RESPONSE" | grep -q "success.*true"; then
  echo "✅ API simples está funcionando"
else
  echo "❌ API simples não está funcionando"
fi

echo
echo "3. 🔍 Testando login simples (POST)..."
LOGIN_RESPONSE=$(curl -s -X POST "$VERCEL_URL/api/simple-login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123"}')

echo "Resposta: $LOGIN_RESPONSE"

if echo "$LOGIN_RESPONSE" | grep -q "success.*true"; then
  echo "✅ Login simples está funcionando"
else
  echo "❌ Login simples não está funcionando"
fi

echo
echo "4. 🔍 Testando página de teste..."
PAGE_CONTENT=$(curl -s "$VERCEL_URL/simple-test")
if echo "$PAGE_CONTENT" | grep -q "PÁGINA DE TESTE SIMPLES"; then
  echo "✅ Página de teste está carregando"
else
  echo "❌ Página de teste não está carregando"
fi

echo
echo "5. 🔍 Verificando headers da página..."
HEADERS=$(curl -s -I "$VERCEL_URL")
echo "$HEADERS" | head -10

echo
echo "=================================="
echo "📊 ANÁLISE DOS RESULTADOS:"
echo
echo "Se a API responder mas a página não carregar:"
echo "   → Problema está no FRONTEND (React/Next.js)"
echo
echo "Se a API não responder:"
echo "   → Problema está no BACKEND (server/routes)"
echo
echo "Se nada responder:"
echo "   → Problema está no DEPLOY ou CONFIGURAÇÃO"
echo
echo "=================================="