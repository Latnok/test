const mysql = require('mysql2/promise');

async function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'currency_db'
  });
}

async function saveCurrencyRate(currencyCode, rate, date) {
  const connection = await getConnection();
  try {
    await connection.execute(
      'INSERT INTO currency (currency_code, rate, date) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rate = ?',
      [currencyCode, rate, date, rate]
    );
  } finally {
    await connection.end();
  }
}

async function getCurrencyRate(currencyCode, date) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM currency WHERE currency_code = ? AND date = ?',
      [currencyCode, date]
    );
    return rows;
  } finally {
    await connection.end();
  }
}

module.exports = { saveCurrencyRate, getCurrencyRate };
