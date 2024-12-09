import { AccountingCalculator } from "../src/service/calculator";
import { Account } from "../src/types/account";

describe("AccountingCalculator", () => {
  const mockData = [
    // Revenue entries
    {
      account_category: "revenue",
      account_type: "sales",
      value_type: "debit",
      total_value: 1000,
    },
    {
      account_category: "revenue",
      account_type: "other",
      value_type: "credit",
      total_value: 500,
    },
    // Expense entries
    {
      account_category: "expense",
      account_type: "overheads",
      value_type: "debit",
      total_value: 300,
    },
    // Asset entries
    {
      account_category: "assets",
      account_type: "current",
      value_type: "debit",
      total_value: 2000,
    },
    {
      account_category: "assets",
      account_type: "bank",
      value_type: "credit",
      total_value: 500,
    },
    // Liability entries
    {
      account_category: "liability",
      account_type: "current",
      value_type: "credit",
      total_value: 1000,
    },
    {
      account_category: "liability",
      account_type: "current_accounts_payable",
      value_type: "debit",
      total_value: 200,
    },
  ] as Account[];

  const calculator = new AccountingCalculator(mockData);

  test("calculateRevenue returns correct total", () => {
    expect(calculator.calculateRevenue()).toBe(1500);
  });

  test("calculateExpenses returns correct total", () => {
    expect(calculator.calculateExpenses()).toBe(300);
  });

  test("calculateGrossProfitMargin returns correct percentage", () => {
    // Sales debit (1000) / Revenue (1500) = 0.6667
    expect(calculator.calculateGrossProfitMargin()).toBeCloseTo(0.6667, 4);
  });

  test("calculateNetProfitMargin returns correct percentage", () => {
    // (Revenue (1500) - Expenses (300)) / Revenue (1500) = 0.8
    expect(calculator.calculateNetProfitMargin()).toBe(0.8);
  });

  test("calculateWorkingCapitalRatio returns correct ratio", () => {
    // Assets (2000 - 500 = 1500) / Liabilities (1000 - 200 = 800) = 1.875
    expect(calculator.calculateWorkingCapitalRatio()).toBe(1.875);
  });

  describe("Edge cases", () => {
    const emptyCalculator = new AccountingCalculator([]);

    test("handles zero revenue for gross profit margin", () => {
      expect(emptyCalculator.calculateGrossProfitMargin()).toBe(0);
    });

    test("handles zero revenue for net profit margin", () => {
      expect(emptyCalculator.calculateNetProfitMargin()).toBe(0);
    });

    test("handles zero liabilities for working capital ratio", () => {
      expect(emptyCalculator.calculateWorkingCapitalRatio()).toBe(0);
    });
  });
});
