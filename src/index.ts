import { parseAccountData } from "./utils/parser";
import { AccountingCalculator } from "./service/calculator";
import { Formatter } from "./utils/formatter";
import { argv } from "process";
function main() {
  try {
    const filePath = argv[2] || "./data.json";

    const data = parseAccountData(filePath);
    const calculator = new AccountingCalculator(data);

    const revenue = calculator.calculateRevenue();
    const expenses = calculator.calculateExpenses();
    const grossProfitMargin = calculator.calculateGrossProfitMargin();
    const netProfitMargin = calculator.calculateNetProfitMargin();
    const workingCapitalRatio = calculator.calculateWorkingCapitalRatio();

    console.log(`Revenue: ${Formatter.formatCurrency(revenue)}`);
    console.log(`Expenses: ${Formatter.formatCurrency(expenses)}`);
    console.log(
      `Gross Profit Margin: ${Formatter.formatPercentage(grossProfitMargin)}`
    );
    console.log(
      `Net Profit Margin: ${Formatter.formatPercentage(netProfitMargin)}`
    );
    console.log(
      `Working Capital Ratio: ${Formatter.formatPercentage(
        workingCapitalRatio
      )}`
    );
  } catch (error) {
    console.error("Error processing accounting data:", error);
    process.exit(1);
  }
}

main();
