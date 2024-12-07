function totalValue(category, data) {
  return data
    .filter(
      (item) => item.account_category.toLowerCase() === category.toLowerCase()
    )
    .reduce((sum, item) => sum + (+item.total_value || 0), 0);
}

/**
 * Calculates the total Revenue value.
 * @param {Array} data - The array of data to calculate from.
 * @returns {number} - The total Revenue.
 */
function calculateRevenue(data) {
  return totalValue("revenue", data);
}

/**
 * Calculates the total Expense value.
 * @param {Array} data - The array of data to calculate from.
 * @returns {number} - The total Expense.
 */
function calculateExpenses(data) {
  return totalValue("expense", data);
}

module.exports = { calculateRevenue, calculateExpenses };
