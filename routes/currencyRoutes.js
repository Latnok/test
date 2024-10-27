const express = require('express');
const { getCurrency } = require('../controllers/currencyController');

const router = express.Router();

// Маршрут для получения курса валюты
router.get('/', getCurrency);

module.exports = router;
