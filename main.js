const metrics = require("./calculateMetrics");

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const formatCurrency = (value) => {
    return `$${Math.round(value).toLocaleString()}`;
};

const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
};

const revenue = metrics.calculateRevenue(data.data);
const expenses = metrics.calculateExpenses(data.data);
const grossProfitMargin = metrics.calculateGrossProfit(data.data, revenue);
const netProfitMargin = metrics.calculateNetProfit(revenue, expenses);
const workingCapitalRatio = metrics.calculateWorkingCapitalRatio(data.data);

console.log("Revenue:",formatCurrency(revenue));
console.log("Expenses:",formatCurrency(expenses));
console.log("Gross Profit Margin:",formatPercentage(grossProfitMargin));
console.log("Net Profit Margin:",formatPercentage(netProfitMargin));
console.log("Working Capital Ratio:",formatPercentage(workingCapitalRatio));

  