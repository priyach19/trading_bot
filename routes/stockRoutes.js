const express = require('express');
const { getStockPrice } = require('../controllers/stockController');

const router = express.Router();

router.get('/stock-price/:symbol', getStockPrice);

module.exports = router;
