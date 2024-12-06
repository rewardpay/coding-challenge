// the code is using fs to read the file
// run the code using nodejs
// visit https://nodejs.org/en for details
// type `node main` in the terminal to run the code

const fs = require("fs");

const data = fs.readFileSync("data.json", "utf8");
const jsonData = JSON.parse(data).data;

const formatCurrency = (value) => {
  return `$${value.toLocaleString()}`;
};

const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
};

const revenue = jsonData
  .filter((record) => record.account_category === "revenue")
  .reduce((sum, record) => sum + record.total_value, 0);

const expenses = jsonData
  .filter((record) => record.account_category === "expense")
  .reduce((sum, record) => sum + record.total_value, 0)

const totalValueSales = jsonData
  .filter((record) => record.account_type === "sales")
  .reduce((sum, record) => sum + record.total_value, 0);

const totalValueDebit = jsonData
  .filter((record) => record.value_type === "debit")
  .reduce((sum, record) => sum + record.total_value, 0);

const grossProfitMargin = (totalValueSales + totalValueDebit) / revenue;

console.log(`Revenue: ${formatCurrency(revenue)}`);
console.log(`Expenses: ${formatCurrency(expenses)}`);
console.log(`Gross Profit Margin: ${formatPercentage(grossProfitMargin)}`);

console.log(totalValueSales)
console.log(totalValueDebit)
