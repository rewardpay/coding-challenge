// the code is using nodejs
// visit https://nodejs.org/en for details
// type `node main` in the terminal to run the code

const fs = require("fs");

// reading the file
var jsonData;

try {
  const data = fs.readFileSync("data.json", "utf8");
  jsonData = JSON.parse(data).data;
} catch (error) {
  console.log("Data file is not found");
}

// calculating the revenue
const revenue = jsonData
  .filter((record) => record.account_category === "revenue")
  .reduce((sum, record) => sum + record.total_value, 0);

// calculating the expenses
const expenses = jsonData
  .filter((record) => record.account_category === "expense")
  .reduce((sum, record) => sum + record.total_value, 0);

// calculating the gross profit margin

const grossProfitMargin = () => {
  const salesDebit = jsonData
    .filter(
      (record) =>
        record.account_type === "sales" && record.value_type === "debit"
    )
    .reduce((sum, record) => sum + record.total_value, 0);
  return (salesDebit / revenue) * 100;
};

// calculating the net profit margin
const netProfitMargin = (revenue - expenses) / revenue;

// calculating the working capital ratio

const workingCapitalRatio = () => {
  const assetsDebit = jsonData
    .filter(
      (record) =>
        record.account_category === "assets" &&
        record.value_type === "debit" &&
        ["current", "bank", "current_accounts_receivable"].includes(
          record.account_type
        )
    )
    .reduce((sum, record) => sum + record.total_value, 0);

  const assetsCredit = jsonData
    .filter(
      (record) =>
        record.account_category === "assets" &&
        record.value_type === "credit" &&
        ["current", "bank", "current_accounts_receivable"].includes(
          record.account_type
        )
    )
    .reduce((sum, record) => sum + record.total_value, 0);

  const liabilitiesDebit = jsonData
    .filter(
      (record) =>
        record.account_category === "liability" &&
        record.value_type === "debit" &&
        ["current", "current_accounts_payable"].includes(record.account_type)
    )
    .reduce((sum, record) => sum + record.total_value, 0);

  const liabilitiesCredit = jsonData
    .filter(
      (record) =>
        record.account_category === "liability" &&
        record.value_type === "credit" &&
        ["current", "current_accounts_payable"].includes(record.account_type)
    )
    .reduce((sum, record) => sum + record.total_value, 0);

  const assets = assetsDebit - assetsCredit;
  const liabilities = liabilitiesCredit - liabilitiesDebit;
  return assets / liabilities;
};

// printing the results
const formatCurrency = (value) => {
  return `$${Math.round(value).toLocaleString()}`;
};

const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`;
};

const yellowText = (text) => `\x1b[33m${text}\x1b[0m`;
const greenText = (text) => `\x1b[32m${text}\x1b[0m`;

console.log(`${greenText("Revenue:")} ${yellowText(formatCurrency(revenue))}`);
console.log(
  `${greenText("Expenses:")} ${yellowText(formatCurrency(expenses))}`
);
console.log(
  `${greenText("Gross Profit Margin:")} ${yellowText(
    formatPercentage(grossProfitMargin())
  )}`
);
console.log(
  `${greenText("Net Profit Margin:")} ${yellowText(
    formatPercentage(netProfitMargin)
  )}`
);
console.log(
  `${greenText("Working Capital Ratio:")} ${yellowText(
    formatPercentage(workingCapitalRatio())
  )}`
);
