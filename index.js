const fs = require('fs');
const { calculateMetrics } = require('./metrics');

function main() {
    const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    const data = jsonData.data || [];  // Access the 'data' array inside the object
    const metrics = calculateMetrics(data);

    console.log(`Revenue: ${metrics.revenue}`);
    console.log(`Expenses: ${metrics.expenses}`);
    console.log(`Gross Profit Margin: ${metrics.grossProfitMargin}`);
    console.log(`Net Profit Margin: ${metrics.netProfitMargin}`);
    console.log(`Working Capital Ratio: ${metrics.workingCapitalRatio}`);
}

main();
