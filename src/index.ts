import { 
    getExpense, 
    getGrossProfitMargin, 
    getNetProfitMargin, 
    getRevenue, 
    getWorkingCapitalRatio 
} from "./calculate";
import { Account } from "./types";
import { 
    readJsonFile, 
    formatCurrency, 
    formatValue 
} from "./utils";

const data = readJsonFile('data.json').data as Account[];

const revenue = getRevenue(data);
const expenses = getExpense(data);
const grossProfitMargin = getGrossProfitMargin(data, revenue);
const netProfitMargin = getNetProfitMargin(revenue, expenses);
const workingCapitalRatio = getWorkingCapitalRatio(data);

// Output the results
console.log(`Revenue: ${formatCurrency(revenue)}`);
console.log(`Expenses: ${formatCurrency(expenses)}`);
console.log(`Gross Profit Margin: ${formatValue(grossProfitMargin)}`);
console.log(`Net Profit Margin: ${formatValue(netProfitMargin)}`);
console.log(`Working Capital Ratio: ${formatValue(workingCapitalRatio)}`);