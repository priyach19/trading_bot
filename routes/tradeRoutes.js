const express = require('express');
const { buyStock, sellStock, getReport } = require('../controllers/tradeController');

const router = express.Router();

router.post('/buy/:symbol', buyStock);
router.post('/sell/:symbol', sellStock);
router.get('/report', getReport);

module.exports = router;
