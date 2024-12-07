import { formatPercentage } from "../../../src/util/Formater.js"; // Import formatPercentage function
import { ReadDataFile } from "../../../src/util/ReadDataFile.js"; // Import ReadDataFile function
import { GrossProfitMargin } from "../../../src/metrics/GrossProfitMargin.js"; // Import GrossProfitMargin function
import data from "../../../src/data/data.json"; // Import the data for the test

// Mock the dependencies to isolate the functions under test
jest.mock("../../../src/util/ReadDataFile.js");
jest.mock("../../../src/util/Formater.js");

describe("GrossProfitMargin Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks before each test
  });

  // Test case to verify Gross Profit Margin calculation
  test("Calculate Gross Profit Margin Correctly", (done) => {
    const finalData = data.data; // Access the data from the JSON import

    const formattedResult = "29.3%"; // The expected formatted result for the test

    // Mock the ReadDataFile to return the data
    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData); // Return the data array from the mocked ReadDataFile function
    });

    // Mock the formatPercentage function to return a fixed percentage result
    formatPercentage.mockImplementation((value) => formattedResult);

    // Calculate the total sales where account type is "sales" and value type is "debit"
    const salesTotal = finalData
      .filter(
        (item) => item.account_type === "sales" && item.value_type === "debit"
      )
      .map((item) => item.total_value) // Extract the total_value from each filtered item
      .reduce((sum, value) => sum + value, 0); // Sum up all total_value fields

    // Calculate the total revenue by summing values where account category is "revenue"
    const revenue = finalData
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0); // Sum up all total_value fields for revenue

    // Calculate the Gross Profit Margin using the formula: (salesTotal / revenue) * 100
    const grossProfitMargin = (salesTotal / revenue) * 100;

    // Call the GrossProfitMargin function and pass the mock callback to verify the result
    GrossProfitMargin((err, result) => {
      expect(err).toBeNull(); // Ensure no error occurred during the calculation
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json", // Ensure the correct file path was passed to ReadDataFile
        expect.any(Function) // Ensure the callback function was passed to ReadDataFile
      );
      expect(formatPercentage).toHaveBeenCalledWith(grossProfitMargin); // Ensure formatPercentage was called with the correct grossProfitMargin value
      expect(result).toBe(formattedResult); // Verify the result matches the expected formatted result
      done(); // Indicate that the asynchronous test is complete
    });
  });
});
