#!/bin/bash

echo "=== Diagnóstico do Sistema Recanto do Guanandi ==="
echo

# Verificar se o servidor está rodando
echo "1. Verificando servidor na porta 3000..."
if curl -s -f http://localhost:3000/ > /dev/null; then
    echo "✅ Servidor está rodando na porta 3000"
else
    echo "❌ Servidor não está respondendo na porta 3000"
    exit 1
fi

echo

# Testar API de saúde
echo "2. Testando API de saúde..."
HEALTH_RESPONSE=$(curl -s http://localhost:3000/api/health)
if [[ $HEALTH_RESPONSE == *"ok"* ]]; then
    echo "✅ API de saúde está funcionando"
else
    echo "❌ API de saúde não está funcionando"
    echo "Resposta: $HEALTH_RESPONSE"
fi

echo

# Testar login de admin
echo "3. Testando login de administrador..."
ADMIN_LOGIN=$(curl -s -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@recanto.com","password":"123456","role":"ADMIN"}')

if [[ $ADMIN_LOGIN == *"Login realizado com sucesso"* ]]; then
    echo "✅ Login de administrador está funcionando"
    echo "   Resposta: $(echo $ADMIN_LOGIN | jq -r '.message')"
else
    echo "❌ Login de administrador não está funcionando"
    echo "   Resposta: $ADMIN_LOGIN"
fi

echo

# Testar login de associado
echo "4. Testando login de associado..."
COMMON_LOGIN=$(curl -s -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"associado@recanto.com","password":"123456","role":"COMMON"}')

if [[ $COMMON_LOGIN == *"Login realizado com sucesso"* ]]; then
    echo "✅ Login de associado está funcionando"
    echo "   Resposta: $(echo $COMMON_LOGIN | jq -r '.message')"
else
    echo "❌ Login de associado não está funcionando"
    echo "   Resposta: $COMMON_LOGIN"
fi

echo

# Testar login com senha incorreta
echo "5. Testando login com senha incorreta..."
WRONG_LOGIN=$(curl -s -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@recanto.com","password":"senhaerrada","role":"ADMIN"}')

if [[ $WRONG_LOGIN == *"Senha incorreta"* ]]; then
    echo "✅ Validação de senha incorreta está funcionando"
    echo "   Resposta: $(echo $WRONG_LOGIN | jq -r '.message')"
else
    echo "❌ Validação de senha incorreta não está funcionando"
    echo "   Resposta: $WRONG_LOGIN"
fi

echo

# Verificar processos
echo "6. Verificando processos do servidor..."
PROCESS_COUNT=$(ps aux | grep -E "(node|next)" | grep -v grep | wc -l)
echo "   Processos Node.js em execução: $PROCESS_COUNT"

if [ $PROCESS_COUNT -gt 10 ]; then
    echo "⚠️  Muitos processos Node.js em execução"
else
    echo "✅ Número de processos acceptable"
fi

echo
echo "=== Diagnóstico Concluído ==="