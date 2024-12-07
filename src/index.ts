/**
 * @fileoverview Main application entry point for financial calculations
 * Reads financial data from JSON file, validates the data structure,
 * performs calculations, and outputs formatted financial metrics
 */

import { readFileSync } from "fs";
import { join } from "path";
import {
  calculateTotalRevenue,
  calculateTotalExpenses,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateWorkingCapitalRatio,
} from "./calculations";
import { formatAsCurrencyString, formatAsPercentageString } from "./format";
import { DataItem } from "../types";

/**
 * Read and parse the JSON data file
 * @throws {Error} If file cannot be read or parsed
 */
const rawData = readFileSync(join(__dirname, "..", "data/data.json"), "utf8");
const parsedData = JSON.parse(rawData);

/**
 * Type guard to validate that parsed data conforms to DataItem[] structure
 *
 * Validates:
 * - Input must be an array
 * - Each element must have required properties with correct types:
 *   - account_category (string)
 *   - account_type (string)
 *   - value_type (string)
 *   - total_value (finite number)
 *
 * @param data - Unknown data to validate
 * @returns Type predicate indicating if data is DataItem[]
 * @example
 * if (validateData(someData)) {
 *   // TypeScript now knows someData is DataItem[]
 *   const revenue = calculateRevenue(someData);
 * }
 */
function validateFinancialData(data: unknown): data is DataItem[] {
  if (!Array.isArray(data)) return false;
  return data.every(
    (item: any) =>
      typeof item === "object" &&
      item !== null &&
      typeof item.account_category === "string" &&
      typeof item.account_type === "string" &&
      typeof item.value_type === "string" &&
      typeof item.total_value === "number" &&
      Number.isFinite(item.total_value)
  );
}

/**
 * Validate the JSON structure and extract data
 * @throws {Error} If JSON structure is invalid or data format is incorrect
 */
if (
  !parsedData ||
  typeof parsedData !== "object" ||
  !parsedData.hasOwnProperty("data")
) {
  throw new Error('Invalid JSON structure: "data" key is missing.');
}

const financialData = parsedData["data"];
if (!validateFinancialData(financialData)) {
  throw new Error('Invalid data format in "data" key. Expected DataItem[].');
}

/**
 * Calculate financial metrics
 *
 * Metrics calculated:
 * 1. Revenue - Total income from all revenue sources
 * 2. Expenses - Total costs from all expense categories
 * 3. Gross Profit Margin - (Sales Revenue / Total Revenue) * 100
 * 4. Net Profit Margin - ((Revenue - Expenses) / Revenue) * 100
 * 5. Working Capital Ratio - (Current Assets / Current Liabilities) * 100
 *
 * @throws {Error} If calculations fail due to invalid data or division by zero
 */
const totalRevenue = calculateTotalRevenue(financialData);
const totalExpenses = calculateTotalExpenses(financialData);
const grossProfitMargin = calculateGrossProfitMargin(financialData, totalRevenue);
const netProfitMargin = calculateNetProfitMargin(totalRevenue, totalExpenses);
const workingCapitalRatio = calculateWorkingCapitalRatio(financialData);

/**
 * Output formatted results to console
 *
 * Format specifications:
 * - Currency values are formatted with $ symbol, remove cents and have thousands separators
 * - Percentages are formatted with one decimal place and % symbol
 *
 * Example output:
 * Revenue: $150,000
 * Expenses: $75,000
 * Gross Profit Margin: 65.5%
 * Net Profit Margin: 50.0%
 * Working Capital Ratio: 150.0%
 */
console.log(`Revenue: ${formatAsCurrencyString(totalRevenue)}`);
console.log(`Expenses: ${formatAsCurrencyString(totalExpenses)}`);
console.log(`Gross Profit Margin: ${formatAsPercentageString(grossProfitMargin)}`);
console.log(`Net Profit Margin: ${formatAsPercentageString(netProfitMargin)}`);
console.log(`Working Capital Ratio: ${formatAsPercentageString(workingCapitalRatio)}`);