import { describe, it, expect, beforeEach, afterEach } from "vitest";
const {
  calculateExpenses,
  calculateRevenue,
} = require("../../src/calculations/totalValue");

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
