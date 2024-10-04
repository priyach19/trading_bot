//importing the model for tradebot
const tradeBot = require('../models/tradeBot');

//function to get stock price based on params passed here as a stock symbol
const getStockPrice = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stockPrice = await tradeBot.getStockPrice(symbol);
  if (stockPrice) {
    res.json({ symbol, stockPrice });
  } else {
    res.status(500).json({ error: 'Failed to fetch stock price' });
  }
};

module.exports = { getStockPrice };
