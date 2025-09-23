const { execSync } = require('child_process');

console.log('🚀 Solução definitiva para Vercel...');

try {
  // Passo 1: Limpar caches
  console.log('🧹 Limpando caches...');
  try {
    execSync('rm -rf .next node_modules/.prisma', { stdio: 'ignore' });
  } catch (e) {
    // Ignorar erros de limpeza
  }

  // Passo 2: Gerar Prisma Client (tentativa 1)
  console.log('📦 Gerando Prisma Client...');
  try {
    execSync('npx prisma generate', { stdio: 'pipe' });
    console.log('✅ Prisma Client gerado com sucesso');
  } catch (prismaError) {
    console.log('⚠️  Falha ao gerar Prisma Client, tentando abordagem alternativa...');
    
    // Tentativa 2: Com schema específico
    try {
      execSync('npx prisma generate --schema=./prisma/schema.prisma', { stdio: 'pipe' });
      console.log('✅ Prisma Client gerado com schema específico');
    } catch (schemaError) {
      console.log('⚠️  Falha com schema específico, continuando anyway...');
    }
  }

  // Passo 3: Build do Next.js
  console.log('🔨 Buildando Next.js...');
  execSync('next build', { stdio: 'inherit' });

  console.log('🎉 Build concluído com sucesso!');

} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}