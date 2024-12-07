const {
  calculateRevenue,
  calculateExpenses,
} = require("./calculations/totalValue");
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

    console.log(revenue);
    console.log(expenses);

    //

    // clearFile();
    // appendToFile("Some text comes here.");
  } catch (error) {
    console.error("Failed to load data:", error.message);
  }
}

main();
