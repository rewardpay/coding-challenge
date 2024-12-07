function totalAssetsByValueType(data, valueType) {
  return data
    .filter(
      (item) =>
        item.account_category?.toLowerCase() === "assets" &&
        item.value_type?.toLowerCase() === valueType &&
        ["current", "bank", "current_accounts_receivable"].includes(
          item.account_type?.toLowerCase()
        )
    )
    .reduce((sum, item) => sum + (+item.total_value || 0), 0);
}

function totalLiabilitiesByValueType(data, valueType) {
  return data
    .filter(
      (item) =>
        item.account_category?.toLowerCase() === "liability" &&
        item.value_type?.toLowerCase() === valueType &&
        ["current", "current_accounts_payable"].includes(
          item.account_type?.toLowerCase()
        )
    )
    .reduce((sum, item) => sum + (+item.total_value || 0), 0);
}

/**
 * Calculates the total Working Capital Ratio value.
 * @param {Array} data - The array of data to calculate from.
 * @returns {number} - The Working Capital Ratio as a percentage.
 */
function calculateWorkingCapitalRatio(data) {
  const assetsDebit = totalAssetsByValueType(data, "debit");
  const assetsCredit = totalAssetsByValueType(data, "credit");

  const assets = assetsDebit - assetsCredit;

  const liabilitiesDebit = totalLiabilitiesByValueType(data, "debit");
  const liabilitiesCredit = totalLiabilitiesByValueType(data, "credit");

  const liabilities = liabilitiesCredit - liabilitiesDebit;

  return liabilities === 0 ? 0 : (assets / liabilities) * 100;
}

module.exports = { calculateWorkingCapitalRatio };
