import { Revenue } from "../../../src/metrics/Revenue.js";
import { formatCurrency } from "../../../src/util/Formater.js";
import { ReadDataFile } from "../../../src/util/ReadDataFile.js";

//Mock the dependencies

jest.mock("../../../src/util/Formater.js");
jest.mock("../../../src/util/ReadDataFile.js");

describe("Revenue Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Calculate Total Revenue Correctly:", (done) => {
    const mockData = [
      { account_category: "expense", total_value: 100 },
      { account_category: "expense", total_value: 200 },
      { account_category: "revenue", total_value: 30000 },
    ];
    const formattedResult = "$3,000";

    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, mockData);
    });
    formatCurrency.mockImplementation((value) => formattedResult);

    Revenue((err, result) => {
      expect(err).toBeNull();
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json",
        expect.any(Function)
      );
      expect(formatCurrency).toHaveBeenCalledWith(30000);
      expect(result).toBe(formattedResult);
      done();
    });
  });
});
