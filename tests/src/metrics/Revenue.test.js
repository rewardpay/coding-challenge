import { Revenue } from "../../../src/metrics/Revenue.js";
import { formatCurrency } from "../../../src/util/Formater.js";
import { ReadDataFile } from "../../../src/util/ReadDataFile.js";
import data from "../../../src/data/data.json";
//Mock the dependencies

jest.mock("../../../src/util/Formater.js");
jest.mock("../../../src/util/ReadDataFile.js");

describe("Revenue Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Calculate Total Revenue Correctly:", (done) => {
    const formattedResult = "$3,000";
    const finalData = data.data;
    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData);
    });
    formatCurrency.mockImplementation((value) => formattedResult);

    const revenue = finalData
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    Revenue((err, result) => {
      expect(err).toBeNull();
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json",
        expect.any(Function)
      );
      expect(formatCurrency).toHaveBeenCalledWith(revenue);
      expect(result).toBe(formattedResult);
      done();
    });
  });
});
