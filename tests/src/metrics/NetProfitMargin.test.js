import { formatPercentage } from "../../../src/util/Formater.js"; // Import formatPercentage function
import { ReadDataFile } from "../../../src/util/ReadDataFile.js"; // Import ReadDataFile function
import { NetProfitMargin } from "../../../src/metrics/NetProfitMargin.js"; // Import NetProfitMargin function
import data from "../../../src/data/data.json"; // Import the data from the JSON file

// Mock the dependencies to isolate the functions under test
jest.mock("../../../src/util/ReadDataFile.js");
jest.mock("../../../src/util/Formater.js");

describe("NetProfitMargin Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks before each test to ensure no carry-over
  });

  // Test case to verify correct calculation of the Net Profit Margin
  test("Calculate Net Profit Margin Correctly", (done) => {
    const formattedResult = "12.4%"; // Expected result after formatting the calculated net profit margin
    const finalData = data.data; // Access the data from the imported JSON file

    // Mock implementation of ReadDataFile to return the data array
    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData); // Simulate reading the data from the file
    });

    // Mock implementation of formatPercentage to return the formatted result
    formatPercentage.mockImplementation((value) => formattedResult);

    // Calculate the total revenue by summing up the total_value where account_category is "revenue"
    const revenue = finalData
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the total expenses by summing up the total_value where account_category is "expenses"
    const expenses = finalData
      .filter((item) => item.account_category === "expenses")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the Net Profit Margin using the formula: ((revenue - expenses) / revenue) * 100
    const netProfitMargin = ((revenue - expenses) / revenue) * 100;

    // Call the NetProfitMargin function and pass the mock callback to verify the result
    NetProfitMargin((err, result) => {
      expect(err).toBeNull(); // Ensure no error occurred during the calculation
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json", // Ensure the correct file path was passed to ReadDataFile
        expect.any(Function) // Ensure the callback function was passed to ReadDataFile
      );
      expect(formatPercentage).toHaveBeenCalledWith(netProfitMargin); // Ensure formatPercentage was called with the calculated net profit margin
      expect(result).toBe(formattedResult); // Verify the result matches the mocked formatted result
      done(); // Indicate that the asynchronous test is complete
    });
  });
});
