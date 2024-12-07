import { formatPercentage } from "../../../src/util/Formater.js";
import { ReadDataFile } from "../../../src/util/ReadDataFile.js";
import { NetProfitMargin } from "../../../src/metrics/NetProfitMargin.js";
import data from "../../../src/data/data.json";

jest.mock("../../../src/util/ReadDataFile.js");
jest.mock("../../../src/util/Formater.js");

describe("NetProfitMargin Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Calculate Net Profit Margin Correctly", (done) => {
    const formattedResult = "12.4%";
    const finalData = data.data;

    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData);
    });
    formatPercentage.mockImplementation((value) => formattedResult);
    const revenue = finalData
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const expenses = finalData
      .filter((item) => item.account_category === "expenses")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const netProfitMargin = ((revenue - expenses) / revenue) * 100;

    NetProfitMargin((err, result) => {
      expect(err).toBeNull();
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json",
        expect.any(Function)
      );
      expect(formatPercentage).toHaveBeenCalledWith(netProfitMargin);
      expect(result).toBe(formattedResult);
      done();
    });
  });
});
