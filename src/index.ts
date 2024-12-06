import { parseData, formatCurrency } from './utils';
import { calculateRevenue, calculateExpenses, calculateGrossProfitMargin, calculateNetProfitMargin, calculateWorkingCapitalRatio } from '../src/metrics';

const data = parseData('./data.json');
//console.log(data);  // to check the parsed data to verify it's an array
const revenue = calculateRevenue(data);
const expenses = calculateExpenses(data);
const grossProfitMargin = calculateGrossProfitMargin(data, revenue);
const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
const workingCapitalRatio = calculateWorkingCapitalRatio(data);

console.log(`Revenue: ${formatCurrency(revenue)}`);
console.log(`Expenses: ${formatCurrency(expenses)}`);
console.log(`Gross Profit Margin: ${grossProfitMargin.toFixed(1)}%`);
console.log(`Net Profit Margin: ${netProfitMargin.toFixed(1)}%`);
console.log(`Working Capital Ratio: ${workingCapitalRatio.toFixed(1)}%`);
