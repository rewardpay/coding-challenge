import { calculations } from "./calculations";
import dataSource from "./data/data.json" 
import { formatCurrency, formatPercentage } from "./resultFormat";

const result=calculations(dataSource.data)

console.log(`Revenue: ${formatCurrency(result.revenue)}`);
console.log(`Expenses: ${formatCurrency(result.expenses)}`);
console.log(`Gross Profit Margin: ${formatPercentage(result.grossProfitMargin)}`);
console.log(`Net Profit Margin: ${formatPercentage(result.netProfitMargin)}`);
console.log(`Working Capital Ratio: ${formatPercentage(result.workingCapitalRatio)}`);


