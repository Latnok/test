const axios = require('axios');
const { saveCurrencyRate } = require('../models/currencyModel');
const xml2js = require('xml2js');

async function updateCurrencyRates() {
  try {
    const response = await axios.get('http://www.cbr.ru/scripts/XML_daily.asp');
    const result = await xml2js.parseStringPromise(response.data);
    const currencies = result.ValCurs.Valute;
    const date = new Date(result.ValCurs['$'].Date);

    for (const currency of currencies) {
      const currencyCode = currency.CharCode[0];
      const rate = parseFloat(currency.Value[0].replace(',', '.'));
      await saveCurrencyRate(currencyCode, rate, date);
    }

    console.log('Currency rates updated successfully');
  } catch (error) {
    console.error('Error updating currency rates:', error);
  }
}

module.exports = { updateCurrencyRates };
