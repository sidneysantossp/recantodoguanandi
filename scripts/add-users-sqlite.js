const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// Conectar ao banco de dados
const db = new sqlite3.Database('./db/custom.db', async (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  
  console.log('Conectado ao banco de dados SQLite.');

  try {
    // Gerar hash da senha "123456"
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Inserir usuário comum
    db.run(
      `INSERT OR REPLACE INTO User (id, email, password, name, role, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      ['1', 'associado@recanto.com', hashedPassword, 'João Associado', 'COMMON'],
      function(err) {
        if (err) {
          console.error('Erro ao inserir usuário comum:', err.message);
        } else {
          console.log('Usuário comum criado com sucesso.');
        }
      }
    );

    // Inserir usuário admin
    db.run(
      `INSERT OR REPLACE INTO User (id, email, password, name, role, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      ['2', 'admin@recanto.com', hashedPassword, 'Maria Administradora', 'ADMIN'],
      function(err) {
        if (err) {
          console.error('Erro ao inserir usuário admin:', err.message);
        } else {
          console.log('Usuário admin criado com sucesso.');
        }
      }
    );

    console.log('\nUsuários de teste criados:');
    console.log('Usuário comum: associado@recanto.com / 123456');
    console.log('Usuário admin: admin@recanto.com / 123456');
    
  } catch (error) {
    console.error('Erro ao criar usuários:', error);
  } finally {
    // Fechar conexão após um breve delay para permitir que as inserções sejam concluídas
    setTimeout(() => {
      db.close((err) => {
        if (err) {
          console.error('Erro ao fechar conexão:', err.message);
        } else {
          console.log('Conexão com o banco de dados fechada.');
        }
      });
    }, 1000);
  }
});