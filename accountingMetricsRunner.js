const { calculateMetrics } = require('./accountingMetrics');
const fs = require('fs');
const path = require('path');

// Load and parse data from data.json
const dataFilePath = path.join(__dirname, 'data.json');
const jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

// Extract relevant data
const records = jsonData.data;

// Run calculations and output results
const metrics = calculateMetrics(records);
console.log('Accounting Metrics:');
console.log(`Revenue: ${metrics.revenue}`);
console.log(`Expenses: ${metrics.expenses}`);
console.log(`Gross Profit Margin: ${metrics.grossProfitMargin}`);
console.log(`Net Profit Margin: ${metrics.netProfitMargin}`);
console.log(`Working Capital Ratio: ${metrics.workingCapitalRatio}`);