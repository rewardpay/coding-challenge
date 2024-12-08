import { describe, it, expect } from "vitest";
import { calculateWorkingCapitalRatio } from "../../src/calculations/workingCapitalRatio";

const data = [
  {
    account_category: "assets",
    value_type: "debit",
    account_type: "current",
    total_value: 1500,
  },
  {
    account_category: "assets",
    value_type: "credit",
    account_type: "bank",
    total_value: 3000,
  },
  {
    account_category: "assets",
    value_type: "debit",
    account_type: "current_accounts_receivable",
    total_value: 3000,
  },
  {
    account_category: "liability",
    value_type: "debit",
    account_type: "current",
    total_value: 3000,
  },
  {
    account_category: "liability",
    value_type: "credit",
    account_type: "current_accounts_payable",
    total_value: 6000,
  },
];

describe("calculateWorkingCapitalRatio", () => {
  it("should correctly calculate the Working Capital Ratio", () => {
    const result = calculateWorkingCapitalRatio(data);
    expect(result).toBe(50);
  });

  it("should return 0 if liabilities are 0", () => {
    const result = calculateWorkingCapitalRatio([]);
    expect(result).toBe(0);
  });

  it("should return correct result when assets and liabilities match", () => {
    const result = calculateWorkingCapitalRatio([
      {
        account_category: "assets",
        value_type: "debit",
        account_type: "current",
        total_value: 5000,
      },
      {
        account_category: "liability",
        value_type: "credit",
        account_type: "current",
        total_value: 5000,
      },
    ]);
    expect(result).toBe(100); // (5000) / (5000) = 1
  });

  it("should handle cases where there is no asset or liability data", () => {
    const result = calculateWorkingCapitalRatio([
      {
        account_category: "assets",
        value_type: "debit",
        account_type: "current",
        total_value: 0,
      },
    ]);
    expect(result).toBe(0); // No liabilities to divide by
  });

  it("should return 0 when liabilities are zero or negative", () => {
    const result = calculateWorkingCapitalRatio([
      {
        account_category: "assets",
        value_type: "debit",
        account_type: "current",
        total_value: 5000,
      },
      {
        account_category: "liability",
        value_type: "debit",
        account_type: "current",
        total_value: 0,
      },
    ]);
    expect(result).toBe(0); // 5000 / 0
  });
});
