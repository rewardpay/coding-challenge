import {
  parseData,
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
} from "./calculations.js";
import { formatCurrency, formatPercentage } from "./utils.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, "../data.json");

function main() {
  const data = parseData(dataFilePath);

  const revenue = calculateRevenue(data, "revenue");
  const expenses = calculateExpenses(data, "expense");
  const grossProfitMargin = calculateGrossProfitMargin(data, revenue);

  console.log(`Revenue: ${formatCurrency(revenue)}`);
  console.log(`Expenses: ${formatCurrency(expenses)}`);
  console.log(`Gross Profit Margin: ${formatPercentage(grossProfitMargin)}`);
}

main();
