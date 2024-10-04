# Backend_API_Trading_Bot
A backend application using Node.js that simulates a basic 
trading bot for a hypothetical stock market, to execute trades 
based on predefined rules and conditions while tracking its profit/loss and performance 
metrics.
+ 1. Use a mock API endpoint to get real-time stock prices. 
+ 2. Implement simple trading strategies (e.g., moving average crossover,
momentum trading) based on the stock prices. For example, buy when the stock price drops by 2% and sell when it rises by 3%. 
+ 3. Provide a summary report showing the trades made and the final profit/loss 
statement.

## Script to run the application
+ First add the modules required:
    + axios, winston,express  -for fetching API resource, logging the logs and framework to make code easy.
    +  install using command:
        + npm i axios winston express
+ To run:
  + node index.js

### Endpoints for the API:
+ To get the price of the symbol named stock currently
     + /stock-price/symbol  
+ To get the summary of the trade
     + /report  
