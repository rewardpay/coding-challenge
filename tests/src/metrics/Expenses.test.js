import { Expenses } from "../../../src/metrics/Expenses.js";
import { ReadDataFile } from "../../../src/util/ReadDataFile.js";
import { formatCurrency } from "../../../src/util/Formater.js";

// Mock the dependencies
jest.mock("../../../src/util/ReadDataFile.js");
jest.mock("../../../src/util/Formater.js");

describe("Expenses Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("Calculates total expenses correctly", (done) => {
    // Arrange
    const mockData = [
      { account_category: "expense", total_value: 100 },
      { account_category: "expense", total_value: 2000 },
      { account_category: "revenue", total_value: 300 },
    ];
    const formattedResult = "$3,000";

    // Mock implementation of ReadDataFile
    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, mockData); // Simulate successful file read
    });

    // Mock implementation of formatCurrency
    formatCurrency.mockImplementation((value) => formattedResult); // Simulate formatting

    // Act
    Expenses((err, result) => {
      // Assert
      expect(err).toBeNull(); // No error should occur
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json",
        expect.any(Function)
      );
      expect(formatCurrency).toHaveBeenCalledWith(2100); // Total of 100 + 2000
      expect(result).toBe(formattedResult); // Check formatted result
      done(); // Indicate that the test is complete
    });
  });
});
