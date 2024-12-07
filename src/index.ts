import { Expenses, GrossProfit, NetProfitMargin, Revenue, WorkingCapitalRatio } from "./calculate";
import { readData,formatting } from "./parse";

const data = readData('./data.json');
const revenue = Revenue(data);
const expense = Expenses(data);
const gpm = GrossProfit(data, revenue);
const npm = NetProfitMargin(revenue,expense);
const wcr = WorkingCapitalRatio(data);


console.log(`Revenue: $${formatting(revenue)}`);
console.log(`Expenses: $${formatting(expense)}`);
console.log(`Gross Profit Margin: ${gpm}%`);
console.log(`Net Profit Margin: ${npm}%`);
console.log(`Working Capital Ratio: ${wcr}%`);