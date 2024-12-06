// the test is using jest and nodejs
// visit https://jestjs.io/docs/en/getting-started for details
// install all dependencies using `npm install`
// type `npm test` in the terminal to run the test
// kindly check the code and mockdata for the test

import {
  revenue,
  expenses,
  grossProfitMargin,
  netProfitMargin,
  workingCapitalRatio,
} from "./main.js";

// Sample data for testing
const mockData = [
  { account_category: "revenue", total_value: 1000 },
  { account_category: "revenue", total_value: 2000 },
  { account_category: "expense", total_value: 500 },
  { account_category: "expense", total_value: 300 },
  {
    account_category: "assets",
    value_type: "debit",
    account_type: "current",
    total_value: 1500,
  },
  {
    account_category: "assets",
    value_type: "credit",
    account_type: "current",
    total_value: 200,
  },
  {
    account_category: "liability",
    value_type: "debit",
    account_type: "current",
    total_value: 100,
  },
  {
    account_category: "liability",
    value_type: "credit",
    account_type: "current",
    total_value: 300,
  },
];

describe("Financial Calculations", () => {
  test("calculates revenue correctly", () => {
    expect(revenue(mockData)).toBe(3000);
  });

  test("calculates expenses correctly", () => {
    expect(expenses(mockData)).toBe(800);
  });

  test("calculates gross profit margin correctly", () => {
    const salesDebit = 0; 
    const expectedGrossProfitMargin = (salesDebit / 3000) * 100;
    expect(grossProfitMargin(mockData)).toBeCloseTo(expectedGrossProfitMargin);
  });

  test("calculates net profit margin correctly", () => {
    const expectedNetProfitMargin = (3000 - 800) / 3000; // Net Profit Margin = (Revenue - Expenses) / Revenue
    expect(netProfitMargin(mockData)).toBeCloseTo(expectedNetProfitMargin);
  });

  test("calculates working capital ratio correctly", () => {
    const assets = 1500 - 200; // Assets = Assets Debit - Assets Credit
    const liabilities = 300 - 100; // Liabilities = Liabilities Credit - Liabilities Debit
    const expectedWorkingCapitalRatio = assets / liabilities;
    expect(workingCapitalRatio(mockData)).toBeCloseTo(
      expectedWorkingCapitalRatio
    );
  });
});
