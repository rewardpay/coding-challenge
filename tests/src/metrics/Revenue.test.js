import { Revenue } from "../../../src/metrics/Revenue.js"; // Import the Revenue function to test
import { formatCurrency } from "../../../src/util/Formater.js"; // Import the formatCurrency utility
import { ReadDataFile } from "../../../src/util/ReadDataFile.js"; // Import ReadDataFile to mock file reading
import data from "../../../src/data/data.json"; // Import data.json to use in the test

// Mock the dependencies to isolate the function under test
jest.mock("../../../src/util/Formater.js"); // Mock formatCurrency function
jest.mock("../../../src/util/ReadDataFile.js"); // Mock ReadDataFile function

describe("Revenue Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all previous mocks to avoid carry-over between tests
  });

  // Test case for verifying the total revenue calculation
  test("Calculate Total Revenue Correctly:", (done) => {
    const formattedResult = "$3,000"; // Expected result after formatting the total revenue
    const finalData = data.data; // Extract the data array from the imported JSON

    // Mock ReadDataFile to simulate reading the data from the JSON file
    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData); // Simulate successfully reading the file and returning finalData
    });

    // Mock formatCurrency to return the expected formatted result
    formatCurrency.mockImplementation((value) => formattedResult);

    // Calculate the total revenue by summing the total_value for all items where account_category is "revenue"
    const revenue = finalData
      .filter((item) => item.account_category === "revenue") // Filter the items with account_category "revenue"
      .map((item) => item.total_value) // Extract the total_value from each filtered item
      .reduce((sum, value) => sum + value, 0); // Sum all total_value fields to calculate total revenue

    // Call the Revenue function and pass the mock callback to verify the result
    Revenue((err, result) => {
      expect(err).toBeNull(); // Ensure no error occurred during the calculation
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json", // Ensure the correct file path was passed to ReadDataFile
        expect.any(Function) // Ensure the callback function was passed to ReadDataFile
      );
      expect(formatCurrency).toHaveBeenCalledWith(revenue); // Ensure formatCurrency was called with the calculated revenue
      expect(result).toBe(formattedResult); // Verify that the result matches the expected formatted result
      done(); // Indicate that the asynchronous test is complete
    });
  });
});
