const mysql = require('mysql2/promise');

async function createCurrencyTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'currency_db'
  });

  await connection.execute(\`
    CREATE TABLE IF NOT EXISTS currency (
      id INT AUTO_INCREMENT PRIMARY KEY,
      currency_code VARCHAR(3) NOT NULL,
      rate DECIMAL(10, 4) NOT NULL,
      date DATE NOT NULL,
      UNIQUE KEY unique_currency_date (currency_code, date)
    )
  \`);

  await connection.end();
}

createCurrencyTable().catch(console.error);
