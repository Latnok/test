const { getCurrencyRate } = require('../models/currencyModel');
const { getCachedRate, setCachedRate } = require('../services/cacheService');

async function getCurrency(req, res) {
  let { valute, date } = req.query;
  try {
    if (!date) {
      date = new Date().toISOString().split('T')[0]; // Используем текущую дату, если не указана
    }

    const cacheKey = `${valute}_${date}`;
    const cachedRate = await getCachedRate(cacheKey);
    if (cachedRate) {
      return res.json(JSON.parse(cachedRate));
    }

    const rates = await getCurrencyRate(valute, date);
    if (rates.length === 0) {
      return res.status(404).send('Rate not found');
    }

    await setCachedRate(cacheKey, JSON.stringify(rates[0]), 3600); // Кешируем на 1 час
    res.json(rates[0]);
  } catch (error) {
    res.status(500).send('Server error');
  }
}

module.exports = { getCurrency };
