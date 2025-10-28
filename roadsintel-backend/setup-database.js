const mysql = require('mysql2/promise');

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔌 Connecting to MySQL server...');
    
    // Connect without specifying database
    connection = await mysql.createConnection({
      host: '89.116.25.62',
      port: 3306,
      user: 'dev45',
      password: 'Steve@45',
    });
    
    console.log('✅ Connected to MySQL server');
    
    // Create database
    console.log('📦 Creating database "roadsintel"...');
    await connection.execute('CREATE DATABASE IF NOT EXISTS roadsintel');
    console.log('✅ Database "roadsintel" created successfully');
    
    console.log('\n✨ Database setup complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npx prisma db push');
    console.log('2. Run: npm run start:dev');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
