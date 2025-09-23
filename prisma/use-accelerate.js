const { execSync } = require('child_process');

console.log('🚀 Configurando Prisma com Accelerate...');

try {
  // 1. Gerar Prisma Client sem engine local
  console.log('📦 Gerando Prisma Client com Accelerate...');
  execSync('npx prisma generate --no-engine', { stdio: 'inherit' });

  // 2. Build do Next.js
  console.log('🔨 Buildando Next.js...');
  execSync('next build', { stdio: 'inherit' });

  console.log('🎉 Build concluído com sucesso!');

} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}