import { calculations } from "./calculations";
import { readData } from "./dataLoader";
import { formatCurrency, formatPercentage } from "./resultFormat";

const data=readData("data/data.json")
const result=calculations(data.data)

console.log(`Revenue: ${formatCurrency(result.revenue)}`);
console.log(`Expenses: ${formatCurrency(result.expenses)}`);
console.log(`Gross Profit Margin: ${formatPercentage(result.grossProfitMargin)}`);
console.log(`Net Profit Margin: ${formatPercentage(result.netProfitMargin)}`);
console.log(`Working Capital Ratio: ${formatPercentage(result.workingCapitalRatio)}`);


