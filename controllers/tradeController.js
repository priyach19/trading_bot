//import tradeBot model
const tradeBot = require('../models/tradeBot');

//function to buy the stock using params (as stock symbol )
const buyStock = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  await tradeBot.buyStock(symbol);
  res.json({ message: `Bought stock of ${symbol}` });
};

//function to sell the stock using params (as stock symbol )
const sellStock = async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  await tradeBot.sellStock(symbol);
  res.json({ message: `Sold stock of ${symbol}` });
};

//sunction to get the summary report for the stocks trade
const getReport = (req, res) => {
  const report = tradeBot.summaryReport();
  res.json(report);
};

module.exports = { buyStock, sellStock, getReport };
