const { execSync } = require('child_process');

console.log('🚀 Build minimalista para Vercel...');

try {
  // 1. Tentar gerar Prisma Client
  console.log('📦 Tentando gerar Prisma Client...');
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma Client gerado');
  } catch (prismaError) {
    console.log('⚠️  Falha ao gerar Prisma Client, continuando anyway...');
    console.log(prismaError.message);
  }

  // 2. Build do Next.js
  console.log('🔨 Buildando Next.js...');
  execSync('next build', { stdio: 'inherit' });

  console.log('🎉 Build concluído!');

} catch (error) {
  console.error('❌ Erro final:', error.message);
  process.exit(1);
}