import fs from "fs";

export function parseData(filePath) {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

export function calculateRevenue(dataWrapper, category) {
  return dataWrapper.data
    .filter((item) => item.account_category === category)
    .reduce((sum, item) => sum + item.total_value, 0);
}

export function calculateExpenses(dataWrapper, category) {
  return dataWrapper.data
    .filter((item) => item.account_category === category)
    .reduce((sum, item) => sum + item.total_value, 0);
}

export function calculateGrossProfitMargin(dataWrapper, revenue) {
  const sales = dataWrapper.data
    .filter(
      (item) => item.account_type === "sales" && item.value_type === "debit"
    )
    .reduce((sum, item) => sum + item.total_value, 0);
  return sales / revenue;
}

export function calculateNetProfitMargin(revenue, expenses) {
  return (revenue - expenses) / revenue;
}

export function calculateWorkingCapitalRatio(dataWrapper) {
  const assets = dataWrapper.data
    .filter(
      (item) =>
        item.account_category === "assets" &&
        ["current", "bank", "current_accounts_receivable"].includes(
          item.account_type
        )
    )
    .reduce((sum, item) => {
      return item.value_type === "debit"
        ? sum + item.total_value
        : sum - item.total_value;
    }, 0);

  const liabilities = dataWrapper.data
    .filter(
      (item) =>
        item.account_category === "liability" &&
        ["current", "current_accounts_payable"].includes(item.account_type)
    )
    .reduce((sum, item) => {
      return item.value_type === "credit"
        ? sum + item.total_value
        : sum - item.total_value;
    }, 0);

  return assets / liabilities;
}
