const { execSync } = require('child_process');

console.log('🚀 Iniciando pós-instalação para Vercel...');

try {
  // Gerar Prisma Client
  console.log('📦 Gerando Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client gerado com sucesso');
  
  // Push do schema (opcional)
  try {
    console.log('🗄️  Sincronizando schema com banco de dados...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Schema sincronizado com sucesso');
  } catch (dbError) {
    console.log('⚠️  Erro ao sincronizar schema, mas continuando...');
    console.log(dbError.message);
  }
  
  console.log('🎉 Pós-instalação concluída com sucesso!');
} catch (error) {
  console.error('❌ Erro na pós-instalação:', error.message);
  process.exit(1);
}