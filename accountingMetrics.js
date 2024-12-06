// Helper functions
// ----------------

// Returns a string representation of a value, formatted as currency
const formatCurrency = (value) =>
  `$${Math.round(value).toLocaleString()}`;


// Returns a string representation of a value, formatted as a percentage
const formatPercentage = (value) =>
  `${(value * 100).toFixed(1)}%`;

// Metric calculation functions
// ----------------------------

// Returns the current revenue, updated with the given record
const calculateRevenue = (record, currentRevenue) =>
  record.account_category === "revenue"
    ? currentRevenue + record.total_value
    : currentRevenue;


// Returns the current expenses, updated with the given record
const calculateExpenses = (record, currentExpenses) =>
  record.account_category === "expense"
    ? currentExpenses + record.total_value
    : currentExpenses;


// Returns the current gross profit, updated with the given record
const calculateGrossProfit = (record, currentGrossProfit) =>
  record.account_type === "sales" &&
  record.value_type === "debit"
    ? currentGrossProfit + record.total_value
    : currentGrossProfit;


// Returns the current assets, updated with the given record
const calculateAssets = (record, currentAssets) => {
  if (
    record.account_category === "assets" &&
    ["current", "bank", "current_accounts_receivable"].includes(record.account_type)
  ) {
    const value = record.value_type === "debit" ? record.total_value : -record.total_value;
    return currentAssets + value;
  }
  return currentAssets;
};

// calculateLiabilities(record, currentLiabilities)
// ---------------------------------------------
// Returns the current liabilities, updated with the given record
const calculateLiabilities = (record, currentLiabilities) => {
  if (
    record.account_category === "liability" &&
    ["current", "current_accounts_payable"].includes(record.account_type)
  ) {
    const value = record.value_type === "credit" ? record.total_value : -record.total_value;
    return currentLiabilities + value;
  }
  return currentLiabilities;
};

// Main function
// -------------

// calculateMetrics(records)
// -------------------------
// Returns an object containing the calculated metrics
const calculateMetrics = (records) => {
  let revenue = 0,
    expenses = 0,
    grossProfit = 0,
    assets = 0,
    liabilities = 0;

  for (const record of records) {
    revenue = calculateRevenue(record, revenue);
    expenses = calculateExpenses(record, expenses);
    grossProfit = calculateGrossProfit(record, grossProfit);
    assets = calculateAssets(record, assets);
    liabilities = calculateLiabilities(record, liabilities);
  }

  const grossProfitMargin = revenue ? grossProfit / revenue : 0;
  const netProfitMargin = revenue ? (revenue - expenses) / revenue : 0;
  const workingCapitalRatio = liabilities ? assets / liabilities : 0;

  return {
    revenue: formatCurrency(revenue),
    expenses: formatCurrency(expenses),
    grossProfitMargin: formatPercentage(grossProfitMargin),
    netProfitMargin: formatPercentage(netProfitMargin),
    workingCapitalRatio: formatPercentage(workingCapitalRatio),
  };
};

module.exports = { calculateMetrics, formatCurrency, formatPercentage };

