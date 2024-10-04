const axios = require('axios');
const logger = require('../config/logger');

//Intialize all the intial values needed for the logic
const tradeBot = {
  balance: 10000,          // Starting balance
  stockHoldings: 0,        // Number of stocks held
  currentSymbol: null,     // Symbol being tracked
  tradeHistory: [],        // History of all trades
  profit: 0,               // Cumulative profit
  initialBalance: 10000,   // Starting balance for profit/loss calculation
  

  // function to get price of stock using symbol passed and using token (API key) for authentication
  async getStockPrice(symbol) {
    try {
      const API_KEY = process.env.API_KEY;
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      const stockPrice = response.data.c;
      logger.info(`Fetched price for ${symbol}: $${stockPrice}`);
      return stockPrice;
    } catch (error) {
      logger.error(`Error fetching stock price: ${error.message}`);
      return null;
    }
  },

  async buyStock(symbol) {
    const stockPrice = await this.getStockPrice(symbol);
    if (stockPrice && this.balance > 0) {
      const quantity = Math.floor(this.balance / stockPrice);
      this.balance -= quantity * stockPrice;
      this.stockHoldings += quantity;
      this.tradeHistory.push({ action: 'BUY', price: stockPrice, quantity, timestamp: new Date() });
      this.currentSymbol = symbol;
      logger.info(`Bought ${quantity} shares of ${symbol} at $${stockPrice}`);
    } else {
      logger.error(`Insufficient balance or could not fetch stock price for ${symbol}`);
    }
  },

  async sellStock(symbol) {
    const stockPrice = await this.getStockPrice(symbol);
    if (stockPrice && this.stockHoldings > 0) {
      const quantity = this.stockHoldings;
      this.balance += quantity * stockPrice;
      const tradeProfit = (stockPrice - this.tradeHistory[0].price) * quantity;
      this.profit += tradeProfit;
      this.stockHoldings = 0;
      this.tradeHistory.push({ action: 'SELL', price: stockPrice, quantity, profit: tradeProfit, timestamp: new Date() });
      logger.info(`Sold ${quantity} shares of ${symbol} at $${stockPrice}. Profit: $${tradeProfit}`);
    } else {
      logger.error(`No stock holdings or could not fetch stock price for ${symbol}`);
    }
  },

  summaryReport() {
    const currentStockPrice = this.stockHoldings > 0 ? this.tradeHistory[this.tradeHistory.length - 1].price : 0;
    const holdingsValue = currentStockPrice * this.stockHoldings;
    const totalValue = this.balance + holdingsValue;
    const overallProfitLoss = totalValue - this.initialBalance;
    
    return {
      balance: this.balance,
      stockHoldings: this.stockHoldings,
      holdingsValue,
      overallProfitLoss,
      tradeHistory: this.tradeHistory,
    };
  }
};

module.exports = tradeBot;
