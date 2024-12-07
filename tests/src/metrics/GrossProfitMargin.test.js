import { formatPercentage } from "../../../src/util/Formater.js";
import { ReadDataFile } from "../../../src/util/ReadDataFile.js";
import { GrossProfitMargin } from "../../../src/metrics/GrossProfitMargin.js";
import data from "../../../src/data/data.json";

jest.mock("../../../src/util/ReadDataFile.js");
jest.mock("../../../src/util/Formater.js");

describe("GrossProfitMargin Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Calculate Gross Profit Margin Correctly", (done) => {
    const finalData = data.data;

    const formattedResult = "29.3%";

    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData);
    });

    formatPercentage.mockImplementation((value) => formattedResult);

    const salesTotal = finalData
      .filter(
        (item) => item.account_type === "sales" && item.value_type === "debit"
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const revenue = finalData
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const grossProfitMargin = (salesTotal / revenue) * 100;

    GrossProfitMargin((err, result) => {
      expect(err).toBeNull();
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json",
        expect.any(Function)
      );
      expect(formatPercentage).toHaveBeenCalledWith(grossProfitMargin);
      expect(result).toBe(formattedResult);
      done();
    });
  });
});
