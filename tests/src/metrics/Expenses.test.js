import { Expenses } from "../../../src/metrics/Expenses.js";
import { ReadDataFile } from "../../../src/util/ReadDataFile.js";
import { formatCurrency } from "../../../src/util/Formater.js";
import data from "../../../src/data/data.json";

// Mock the dependencies
jest.mock("../../../src/util/ReadDataFile.js");
jest.mock("../../../src/util/Formater.js");

describe("Expenses Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("Calculates total expenses correctly", (done) => {
    // Arrange
    const finalData = data.data;
    const formattedResult = "$3,000";

    // Mock implementation of ReadDataFile
    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData); // Simulate successful file read
    });

    // Mock implementation of formatCurrency
    formatCurrency.mockImplementation((value) => formattedResult); // Simulate formatting
    const expenses = finalData
      .filter((item) => item.account_category === "expense")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);
    // Act
    Expenses((err, result) => {
      // Assert
      expect(err).toBeNull(); // No error should occur
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json",
        expect.any(Function)
      );
      expect(formatCurrency).toHaveBeenCalledWith(expenses); // Total of 100 + 2000
      expect(result).toBe(formattedResult); // Check formatted result
      done(); // Indicate that the test is complete
    });
  });
});
