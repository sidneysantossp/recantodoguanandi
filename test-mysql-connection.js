const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('🔍 Testando conexão com MySQL...');
  
  const connection = await mysql.createConnection({
    host: '203.161.46.119',
    port: 3306,
    user: 'canticosccb_finance-guanindi',
    password: 'KmSs147258!',
    database: 'canticosccb_finance-guanindi'
  });

  try {
    await connection.connect();
    console.log('✅ Conexão bem sucedida!');
    
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query executada com sucesso:', rows);
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
  } finally {
    await connection.end();
  }
}

testConnection();