const {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
} = require("./calculations/accountingMetrics");
const {
  formatCurrency,
  formatPercentage,
} = require("./helpers/dataFormatting");
const {
  readJsonFile,
  appendToFile,
  clearFile,
} = require("./helpers/fileHandler");

const dataFilePath = "./data/data.json";

function main() {
  try {
    //Read data from the file

    //TODO: see if I need this in the future
    // currency: 'AUD',
    // balance_date: '2020-09-30T00:00:00.000Z'
    const { data } = readJsonFile(dataFilePath);

    //Clear previously stored values from the file
    clearFile();

    //Calculate and save Revenue value
    const revenue = calculateRevenue(data);
    appendToFile(`Revenue: ${formatCurrency(revenue)}`);

    //Calculate and save Expenses value
    const expenses = calculateExpenses(data);
    appendToFile(`Expenses: ${formatCurrency(expenses)}`);

    //Calculate and save Gross Profit Margin value
    const grossProfMarg = calculateGrossProfitMargin(data, revenue);
    appendToFile(`Gross Profit Margin: ${formatPercentage(grossProfMarg)}`);

    //Calculate and save Net Profit Margin value
    const netProfMarg = calculateNetProfitMargin(data, revenue, expenses);
    appendToFile(`Net Profit Margin: ${formatPercentage(netProfMarg)}`);

    console.log(formatCurrency(revenue));
    console.log(formatCurrency(expenses));
    console.log(formatPercentage(grossProfMarg));
    console.log(formatPercentage(netProfMarg));
  } catch (error) {
    console.error("Failed to load data:", error.message);
  }
}

main();
