const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando fix do Prisma para Vercel...');

try {
  // 1. Limpar qualquer cache existente
  console.log('🧹 Limpando cache...');
  try {
    execSync('rm -rf node_modules/.prisma', { stdio: 'inherit' });
    execSync('rm -rf .next', { stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  Cache não encontrado ou não pôde ser removido');
  }

  // 2. Garantir que o diretório do banco de dados existe
  console.log('📁 Garantindo diretório do banco...');
  const dbDir = path.join(__dirname, 'db');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  const dbFile = path.join(dbDir, 'custom.db');
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, '');
  }

  // 3. Gerar Prisma Client
  console.log('📦 Gerando Prisma Client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    env: { ...process.env, PRISMA_GENERATE_FORCE: 'true' }
  });

  // 4. Verificar se o cliente foi gerado
  const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma', 'client');
  if (!fs.existsSync(prismaClientPath)) {
    throw new Error('Prisma Client não foi gerado');
  }

  console.log('✅ Prisma Client gerado com sucesso');

  // 5. Build do Next.js
  console.log('🔨 Buildando Next.js...');
  execSync('next build', { stdio: 'inherit' });

  console.log('🎉 Build concluído com sucesso!');

} catch (error) {
  console.error('❌ Erro durante o processo:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}