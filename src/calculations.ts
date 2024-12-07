import { DataItem } from "../types";

/** @internal */
function calculateTotalByCondition(
  financialRecords: DataItem[],
  filterCondition: (record: DataItem) => boolean
): number {
  return financialRecords
    .filter(filterCondition)
    .reduce((accumulator, currentRecord) => accumulator + currentRecord.total_value, 0);
}

/** 
 * Calculates total revenue from financial data
 * @param financialRecords - Array of financial data items
 * @returns Total revenue value
 * @example
 * const revenue = calculateTotalRevenue(financialData);
 * console.log(revenue); // 150000
 */
export function calculateTotalRevenue(financialRecords: DataItem[]): number {
  return calculateTotalByCondition(financialRecords,
    (record) => record.account_category === "revenue");
}

/**
 * Calculates total expenses from financial data
 * @param financialRecords - Array of financial data items
 * @returns Total expenses value
 * @example
 * const expenses = calculateTotalExpenses(financialData);
 * console.log(expenses); // 75000
 */
export function calculateTotalExpenses(financialRecords: DataItem[]): number {
  return calculateTotalByCondition(financialRecords,
    (record) => record.account_category === "expense");
}

/**
 * Calculates the gross profit margin as a percentage
 * Formula: (Sales Revenue / Total Revenue) * 100
 * @param data - Array of financial data items
 * @param revenue - Total revenue value
 * @returns Gross profit margin percentage
 * @throws {Error} When revenue is zero
 * @example
 * const grossProfitMargin = calculateGrossProfitMargin(financialData, revenue);
 * console.log(grossProfitMargin); // 65.5
 */
export function calculateGrossProfitMargin(
  data: DataItem[],
  revenue: number
): number {
  if (revenue === 0) {
    throw new Error(
      "Gross Profit Margin calculation is undefined: revenue is zero."
    );
  }

  const salesTotal = calculateTotalByCondition(
    data,
    (item) => item.account_type === "sales" && item.value_type === "debit"
  );
  return (salesTotal / revenue) * 100;
}

/**
 * Calculates the net profit margin as a percentage
 * Formula: ((Revenue - Expenses) / Revenue) * 100
 * @param totalRevenue - Total revenue value
 * @param totalExpenses - Total expenses value
 * @returns Net profit margin percentage
 * @throws {Error} When revenue is zero
 * @example
 * const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
 * console.log(netProfitMargin); // 50.0
 */
export function calculateNetProfitMargin(
  totalRevenue: number,
  totalExpenses: number
): number {
  if (totalRevenue === 0) {
    throw new Error(
      "Net Profit Margin calculation is undefined: revenue is zero."
    );
  }

  return ((totalRevenue - totalExpenses) / totalRevenue) * 100;
}

/**
 * Calculates the working capital ratio as a percentage
 * Formula: (Current Assets / Current Liabilities) * 100
 *
 * Current assets include:
 * - Current accounts
 * - Bank accounts
 * - Accounts receivable
 *
 * Current liabilities include:
 * - Current accounts
 * - Accounts payable
 *
 * The calculation considers both debit and credit entries for each category
 *
 * @param financialRecords - Array of financial data items
 * @returns Working capital ratio percentage
 * @throws {Error} When liabilities are zero
 * @example
 * const workingCapitalRatio = calculateWorkingCapitalRatiofinancialData);
 * console.log(workingCapitalRatio); // 150.0
 */
export function calculateWorkingCapitalRatio(financialRecords: DataItem[]): number {
  const currentAssetTypes = ["current", "bank", "current_accounts_receivable"];
  const currentLiabilityTypes = ["current", "current_accounts_payable"];

  // Calculate the total current assets by subtracting credits from debits
  const currentAssetDebits = calculateTotalByCondition(
    financialRecords,
    (item) =>
      item.account_category === "assets" &&
      item.value_type === "debit" &&
      currentAssetTypes.includes(item.account_type)
  );

  const currentAssetCredits = calculateTotalByCondition(
    financialRecords,
    (item) =>
      item.account_category === "assets" &&
      item.value_type === "credit" &&
      currentAssetTypes.includes(item.account_type)
  );

  const totalCurrentAssets = currentAssetDebits - currentAssetCredits;

  // Calculate the total current liabilities by subtracting debits from credits
  const currentLiabilityCredits = calculateTotalByCondition(
    financialRecords,
    (item) =>
      item.account_category === "liability" &&
      item.value_type === "credit" &&
      currentLiabilityTypes.includes(item.account_type)
  );

  const currentLiabilityDebits = calculateTotalByCondition(
    financialRecords,
    (item) =>
      item.account_category === "liability" &&
      item.value_type === "debit" &&
      currentLiabilityTypes.includes(item.account_type)
  );

  const totalCurrentLiabilities = currentLiabilityCredits - currentLiabilityDebits;

  if (totalCurrentLiabilities === 0) {
    throw new Error(
      "Working Capital Ratio calculation is undefined: liabilities are zero."
    );
  }

  return (totalCurrentAssets / totalCurrentLiabilities) * 100;
}
