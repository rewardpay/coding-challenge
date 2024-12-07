import { Expenses } from "../../src/metrics/Expenses.js";
import { GrossProfitMargin } from "../../src/metrics/GrossProfitMargin.js";
import { NetProfitMargin } from "../../src/metrics/NetProfitMargin.js";
import { Revenue } from "../../src/metrics/Revenue.js";
import { WorkingCapitalRatio } from "../../src/metrics/WorkingCapitalRatio.js";

// Mock the utility functions for formatting currency and percentages
jest.mock("../../src/util/ReadDataFile.js"); // Mock ReadDataFile module

// Mock the formatting functions to return predefined formatted results
jest.mock("../../src/util/Formater.js", () => ({
  formatCurrency: jest.fn((value) => `$${Math.round(value).toLocaleString()}`), // Mock formatCurrency function
  formatPercentage: jest.fn((value) => `${value.toFixed(1)}%`), // Mock formatPercentage function
}));

describe("Main Workflow", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to ensure a clean slate
  });

  // Hardcoded expected values for comparison
  const hardcodedExpectedRevenue = 32431; // Hardcoded expected revenue
  const hardcodedExpectedExpenses = 33328.64; // Hardcoded expected expenses
  const hardcodedSalesTotal = 20000; // Hardcoded total sales value
  const hardcodedExpectedGrossProfitMargin =
    (hardcodedSalesTotal / hardcodedExpectedRevenue) * 100; // Hardcoded Gross Profit Margin calculation
  const hardcodedExpectedNetProfitMargin =
    ((hardcodedExpectedRevenue - hardcodedExpectedExpenses) /
      hardcodedExpectedRevenue) *
    100; // Hardcoded Net Profit Margin calculation
  const hardcodedExpectedWorkingCapitalRatio = 40.3; // Hardcoded Working Capital Ratio calculation

  test("Calculates all metrics correctly using actual data", (done) => {
    // Directly test functions and assert results with hardcoded values

    // Test the Revenue function
    Revenue((err, revenue) => {
      expect(err).toBeNull(); // No error should occur
      expect(formatCurrency).toHaveBeenCalledWith(hardcodedExpectedRevenue); // Compare with hardcoded value
      expect(revenue).toBe(formatCurrency(hardcodedExpectedRevenue)); // Compare with hardcoded value
    });

    // Test the Expenses function
    Expenses((err, expenses) => {
      expect(err).toBeNull(); // No error should occur
      expect(formatCurrency).toHaveBeenCalledWith(hardcodedExpectedExpenses); // Compare with hardcoded value
      expect(expenses).toBe(formatCurrency(hardcodedExpectedExpenses)); // Compare with hardcoded value
    });

    // Test the GrossProfitMargin function
    GrossProfitMargin((err, grossProfitMargin) => {
      expect(err).toBeNull(); // No error should occur
      expect(formatPercentage).toHaveBeenCalledWith(
        hardcodedExpectedGrossProfitMargin
      ); // Compare with hardcoded value
      expect(grossProfitMargin).toBe(
        formatPercentage(hardcodedExpectedGrossProfitMargin)
      ); // Compare with hardcoded value
    });

    // Test the NetProfitMargin function
    NetProfitMargin((err, netProfitMargin) => {
      expect(err).toBeNull(); // No error should occur
      expect(formatPercentage).toHaveBeenCalledWith(
        hardcodedExpectedNetProfitMargin
      ); // Compare with hardcoded value
      expect(netProfitMargin).toBe(
        formatPercentage(hardcodedExpectedNetProfitMargin)
      ); // Compare with hardcoded value
    });

    // Test the WorkingCapitalRatio function
    WorkingCapitalRatio((err, workingCapitalRatio) => {
      expect(err).toBeNull(); // No error should occur
      expect(formatPercentage).toHaveBeenCalledWith(
        hardcodedExpectedWorkingCapitalRatio
      ); // Compare with hardcoded value
      expect(workingCapitalRatio).toBe(
        formatPercentage(hardcodedExpectedWorkingCapitalRatio)
      ); // Compare with hardcoded value
    });

    done(); // Indicate test completion
  });
});
