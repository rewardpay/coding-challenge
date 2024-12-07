import { Expenses } from "../../src/metrics/Expenses.js";
import { GrossProfitMargin } from "../../src/metrics/GrossProfitMargin.js";
import { NetProfitMargin } from "../../src/metrics/NetProfitMargin.js";
import { Revenue } from "../../src/metrics/Revenue.js";
import { WorkingCapitalRatio } from "../../src/metrics/WorkingCapitalRatio.js";
import data from "../../src/data/data.json";

jest.mock("../../src/util/ReadDataFile.js");

jest.mock("../../src/util/Formater.js", () => ({
  formatCurrency: jest.fn((value) => `$${Math.round(value).toLocaleString()}`),
  formatPercentage: jest.fn((value) => `${value.toFixed(1)}%`),
}));

describe("Main Workflow", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });
  const finalData = data.data;
  test("Calculates all metrics correctly using actual data", (done) => {
    // Dynamically calculate expected values
    const expectedRevenue = finalData
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const expectedExpenses = finalData
      .filter((item) => item.account_category === "expense")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const salesTotal = finalData
      .filter(
        (item) => item.account_type === "sales" && item.value_type === "debit"
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const expectedGrossProfitMargin = (salesTotal / expectedRevenue) * 100;

    const expectedNetProfitMargin =
      ((expectedRevenue - expectedExpenses) / expectedRevenue) * 100;

    const debitAssets = finalData
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "debit" &&
          (item.account_type === "current" ||
            item.account_type === "bank" ||
            item.account_type === "current_accounts_receivable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const creditAssets = finalData
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "credit" &&
          (item.account_type === "current" ||
            item.account_type === "bank" ||
            item.account_type === "current_accounts_receivable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const assets = debitAssets - creditAssets;

    const debitLiabilities = finalData
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "debit" &&
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const creditLiabilities = finalData
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "credit" &&
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const liabilities = creditLiabilities - debitLiabilities;
    const expectedWorkingCapitalRatio = (assets / liabilities) * 100;

    // Call functions and assert results
    Revenue((err, revenue) => {
      expect(err).toBeNull();
      expect(formatCurrency).toHaveBeenCalledWith(expectedRevenue);
    });
    Expenses((err, expenses) => {
      expect(err).toBeNull();
      expect(formatCurrency).toHaveBeenCalledWith(expectedExpenses);
    });
    GrossProfitMargin((err, grossProfitMargin) => {
      expect(err).toBeNull();
      expect(formatPercentage).toHaveBeenCalledWith(expectedGrossProfitMargin);
    });
    NetProfitMargin((err, netProfitMargin) => {
      expect(err).toBeNull();
      expect(formatPercentage).toHaveBeenCalledWith(expectedNetProfitMargin);
    });
    WorkingCapitalRatio((err, workingCapitalRatio) => {
      expect(err).toBeNull();
      expect(formatPercentage).toHaveBeenCalledWith(
        expectedWorkingCapitalRatio
      );
      // Indicate test completion
    });
    done();
  });
});
