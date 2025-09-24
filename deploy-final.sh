#!/bin/bash

echo "🚀 PREPARANDO DEPLOY FINAL COM DIAGNÓSTICO"
echo "=========================================="
echo

echo "📋 O que será enviado para produção:"
echo "✅ Sistema de autenticação simplificado"
echo "✅ API de login minimalista"
echo "✅ Página de teste React"
echo "✅ Página de teste HTML pura"
echo "✅ API de debug"
echo "✅ Documentação completa"
echo

echo "🔧 Fazendo build de produção..."
npm run vercel-build

if [ $? -eq 0 ]; then
    echo "✅ Build bem sucedido!"
    echo
    echo "📊 Arquivos incluídos no build:"
    echo "   - /simple-test (página React)"
    echo "   - /teste-puro.html (página HTML pura)"
    echo "   - /api/simple-login (API de login)"
    echo "   - /api/debug (API de diagnóstico)"
    echo "   - /api/health (API de saúde)"
    echo
    echo "🚀 Instruções para deploy:"
    echo "1. Execute os comandos abaixo:"
    echo "   git add ."
    echo "   git commit -m 'Adicionado sistema completo de diagnóstico'"
    echo "   git push origin main"
    echo
    echo "2. Após o deploy, teste:"
    echo "   https://seu-site.vercel.app/teste-puro.html"
    echo "   https://seu-site.vercel.app/simple-test"
    echo
    echo "3. Se a página HTML funcionar:"
    echo "   → O problema está no React/Next.js"
    echo "   → Podemos migrar para HTML puro"
    echo
    echo "4. Se nada funcionar:"
    echo "   → O problema está no Vercel/servidor"
    echo "   → Verificar logs e configuração"
    echo
    echo "🎯 OBJETIVO: Encontrar a causa raiz do erro!"
    echo
    echo "📞 Em caso de problemas, verifique:"
    echo "   - Console do navegador (F12)"
    echo "   - Logs do Vercel dashboard"
    echo "   - Network tab para ver requisições"
    echo
    echo "=========================================="
    echo "🎉 SISTEMA PRONTO PARA DIAGNÓSTICO FINAL!"
    echo "=========================================="
else
    echo "❌ Build falhou! Verifique os erros acima."
    exit 1
fi