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

    const revenue = calculateRevenue(data);
    const expenses = calculateExpenses(data);
    const grossProfMarg = calculateGrossProfitMargin(data, revenue);
    const netProfMarg = calculateNetProfitMargin(data, revenue, expenses);

    console.log(formatCurrency(revenue));
    console.log(formatCurrency(expenses));
    console.log(formatPercentage(grossProfMarg));
    console.log(formatPercentage(netProfMarg));

    console.log(+"tete");

    //

    // clearFile();
    // appendToFile("Some text comes here.");
  } catch (error) {
    console.error("Failed to load data:", error.message);
  }
}

main();
