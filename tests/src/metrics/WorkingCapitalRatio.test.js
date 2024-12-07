import { formatPercentage } from "../../../src/util/Formater.js";
import { ReadDataFile } from "../../../src/util/ReadDataFile.js";
import data from "../../../src/data/data.json";
import { WorkingCapitalRatio } from "../../../src/metrics/WorkingCapitalRatio";

jest.mock("../../../src/util/ReadDataFile.js");
jest.mock("../../../src/util/Formater.js");

describe("Working Capital Ratio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Calculate Working Capital Ratio Correctly", (done) => {
    const formattedResult = "40.3%";
    const finalData = data.data;

    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData);
    });
    formatPercentage.mockImplementation((value) => formattedResult);

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
    const workingcapitalratio = (assets / liabilities) * 100;

    WorkingCapitalRatio((err, result) => {
      expect(err).toBeNull();
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json",
        expect.any(Function)
      );
      expect(formatPercentage).toHaveBeenCalledWith(workingcapitalratio);
      expect(result).toBe(formattedResult);
      done();
    });
  });
});
