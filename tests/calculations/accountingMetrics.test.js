import { describe, it, expect, beforeEach, afterEach } from "vitest";
const {
  calculateExpenses,
  calculateRevenue,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
} = require("../../src/calculations/accountingMetrics");

const data = [
  { account_category: "revenue", total_value: 100 },
  { account_category: "revenue", total_value: 200 },
  { account_category: "expense", total_value: 50 },
  { account_category: "expense", total_value: 30 },
  { account_category: "REVENUE", total_value: 50 },
  { account_category: "Expense", total_value: 20 },
  { account_category: "expence", total_value: 57 },
];

describe("calculateRevenue", () => {
  it("calculates total revenue correctly", () => {
    const result = calculateRevenue(data);
    expect(result).toBe(350);
  });

  it("returns 0 if no revenue data", () => {
    const noRevenueData = [
      { account_category: "expense", total_value: 50 },
      { account_category: "expense", total_value: 30 },
    ];
    const result = calculateRevenue(noRevenueData);
    expect(result).toBe(0);
  });

  it("returns 0 if no data to filter and calculate", () => {
    const noRevenueData = [];
    const result = calculateRevenue(noRevenueData);
    expect(result).toBe(0);
  });
});

describe("calculateExpenses", () => {
  it("calculates total expenses correctly", () => {
    const result = calculateExpenses(data);
    expect(result).toBe(100);
  });

  it("returns 0 if no expense data", () => {
    const noExpenseData = [
      { account_category: "revenue", total_value: 100 },
      { account_category: "revenue", total_value: 200 },
    ];
    const result = calculateExpenses(noExpenseData);
    expect(result).toBe(0);
  });

  it("filters out invalid data entries", () => {
    const dataWithMixedValues = [
      { account_category: "revenue", total_value: 100 },
      { account_category: "expense", total_value: "string" },
      { account_category: "expense", total_value: "50" },
      { account_category: "expense", total_value: undefined },
      { account_category: "expense", total_value: 20 },
    ];

    const expenseResult = calculateExpenses(dataWithMixedValues);

    expect(expenseResult).toBe(70);
  });
});

describe("calculateGrossProfitMargin", () => {
  const mockData = [
    {
      account_type: "sales",
      account_category: "revenue",
      value_type: "debit",
      total_value: 1000,
    },
    {
      account_type: "sales",
      account_category: "revenue",
      value_type: "debit",
      total_value: "1500",
    },
    { account_type: "Sales", value_type: "credit", total_value: 500 },
    { account_type: "Expense", value_type: "debit", total_value: 200 },
  ];

  it("should calculate the gross profit margin as a percentage with given revenue", () => {
    const revenue = 2500;
    const result = calculateGrossProfitMargin(mockData, revenue);
    expect(result).toBe(100); // (1000 + 1500) / 2500 * 100 = 100%
  });

  it("should calculate the gross profit margin as a percentage without previously calculated revenue", () => {
    const result = calculateGrossProfitMargin(mockData);
    expect(result).toBe(100); // (1000 + 1500) / 2500 * 100 = 100%
  });

  it("should return 0 when revenue is zero", () => {
    const result = calculateGrossProfitMargin(mockData, 0);
    expect(result).toBe(0);
  });

  it("should handle empty data array", () => {
    const result = calculateGrossProfitMargin([]);
    expect(result).toBe(0);
  });

  it("should return 0 when total_value is not set (null or undefined)", () => {
    const mockData = [
      {
        account_type: "sales",
        account_category: "revenue",
        value_type: "debit",
        total_value: "",
      },
      {
        account_type: "sales",
        account_category: "revenue",
        value_type: "debit",
        total_value: null,
      },
    ];
    const result = calculateGrossProfitMargin(mockData);
    expect(result).toBe(0);
  });
});

describe("calculateNetProfitMargin", () => {
  it("should calculate the net profit margin using internally calculated revenue and expenses", () => {
    const result = Math.floor(calculateNetProfitMargin(data));
    expect(result).to.equal(71); // (350 - 100) / 350 * 100 = 71.43%
  });

  it("should calculate the net profit margin using pre-calculated revenue and expenses", () => {
    const result = calculateNetProfitMargin([], 2000, 800);
    expect(result).to.equal(60); // (2000 - 800) / 2000 * 100 = 60%
  });

  it("should return 0 when revenue is 0", () => {
    const result = calculateNetProfitMargin(data, 0, 800);
    expect(result).to.equal(0);
  });

  it("should handle negative expenses correctly", () => {
    const result = calculateNetProfitMargin([], 2000, -500);
    expect(result).to.equal(125); // (2000 - (-500)) / 2000 * 100 = 125%
  });
});
