import { parseData, formatCurrency } from '../utils/utils';
import { calculateRevenue } from './metrics/revenue-calculation';
import { calculateExpenses } from './metrics/expenses-calculation';
import { calculateGrossProfitMargin } from './metrics/gross-profit-margin-calculation';

const data = parseData('./data/data.json');
//console.log(data);  // to check the parsed data to verify it's an array

// Calculate revenue using the revenue-calculation.ts function
const revenue = calculateRevenue(data);

// Calculate expenses using the expenses-calculation.ts function
const expenses = calculateExpenses(data);

// Calculate expenses using the gross-profit-margin-calculation.ts function
const grossProfitMargin = calculateGrossProfitMargin(data, revenue);

console.log(`Revenue: ${formatCurrency(revenue)}`);
console.log(`Expenses: ${formatCurrency(expenses)}`);
console.log(`Gross Profit Margin: ${grossProfitMargin.toFixed(1)}%`);

