function totalValueByCategory(category, data) {
  return data
    .filter(
      (item) => item.account_category?.toLowerCase() === category.toLowerCase()
    )
    .reduce((sum, item) => sum + (+item.total_value || 0), 0);
}

/**
 * Calculates the total Revenue value.
 * @param {Array} data - The array of data to calculate from.
 * @returns {number} - The total Revenue.
 */
function calculateRevenue(data) {
  return totalValueByCategory("revenue", data);
}

/**
 * Calculates the total Expense value.
 * @param {Array} data - The array of data to calculate from.
 * @returns {number} - The total Expense.
 */
function calculateExpenses(data) {
  return totalValueByCategory("expense", data);
}

/**
 * Calculates the total Gross Profit Margin value.
 * @param {Array} data - The array of data to calculate from.
 *  @returns {revenue} - [revenue=null] - The revenue value (optional, will be calculated if not provided).
 * @returns {number} - The total Gross Profit Margin value as a percentage.
 */
function calculateGrossProfitMargin(data, revenue = null) {
  const totalSalesDebit = data
    .filter(
      (item) =>
        item.account_type?.toLowerCase() === "sales" &&
        item.value_type?.toLowerCase() === "debit"
    )
    .reduce((sum, item) => sum + (+item.total_value || 0), 0);

  const rev = revenue !== null ? revenue : calculateRevenue(data);

  return rev === 0 ? 0 : (totalSalesDebit / rev) * 100;
}

/**
 * Calculates the total Net Profit Margin value.
 * @param {Array} data - The array of data to calculate from.
 * @param {number} [revenue=null] - The pre-calculated Revenue value. If null, it calculates the revenue from data.
 * @param {number} [expenses=null] - The pre-calculated Expenses value. If null, it calculates the expenses from data.
 * @returns {number} - The total Net Profit Margin value as a percentage.
 */
function calculateNetProfitMargin(data, revenue = null, expenses = null) {
  const rev = revenue ?? calculateRevenue(data);
  const exp = expenses ?? calculateExpenses(data);

  return rev === 0 ? 0 : ((rev - exp) / rev) * 100;
}

module.exports = {
  calculateRevenue,
  calculateExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
};
