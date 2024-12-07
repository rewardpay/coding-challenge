const {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
} = require("./calculations/accountingMetrics");
const { DATA_INPUT_FILE_PATH } = require("./config");
const {
  formatCurrency,
  formatPercentage,
  createFileOutputLine,
} = require("./helpers/dataFormatting");
const {
  readJsonFile,
  appendToFile,
  clearFile,
} = require("./helpers/fileHandler");

function main() {
  try {
    //Read data from the file
    const { data, currency, balance_date } = readJsonFile(DATA_INPUT_FILE_PATH);

    //Clear previously stored values from the file
    clearFile();

    //Add description header to the file
    const date = new Intl.DateTimeFormat("en-UK").format(
      new Date(balance_date)
    );
    appendToFile(`Accounting metrics calculated for ${date} in ${currency}\n`);

    //Calculate and save Revenue value
    const revenue = calculateRevenue(data);
    appendToFile(createFileOutputLine("Revenue", formatCurrency(revenue)));

    //Calculate and save Expenses value
    const expenses = calculateExpenses(data);
    appendToFile(createFileOutputLine("Expenses", formatCurrency(expenses)));

    //Calculate and save Gross Profit Margin value
    const grossProfMarg = calculateGrossProfitMargin(data, revenue);
    appendToFile(
      createFileOutputLine(
        "Gross Profit Margin",
        formatPercentage(grossProfMarg)
      )
    );

    //Calculate and save Net Profit Margin value
    const netProfMarg = calculateNetProfitMargin(data, revenue, expenses);
    appendToFile(
      createFileOutputLine("Net Profit Margin", formatPercentage(netProfMarg))
    );

    console.log(formatCurrency(revenue));
    console.log(formatCurrency(expenses));
    console.log(formatPercentage(grossProfMarg));
    console.log(formatPercentage(netProfMarg));
  } catch (error) {
    console.error("Failed to load data:", error.message);
  }
}

main();
