import { formatPercentage } from "../../../src/util/Formater.js"; // Import the formatPercentage function
import { ReadDataFile } from "../../../src/util/ReadDataFile.js"; // Import the ReadDataFile function
import data from "../../../src/data/data.json"; // Import the data from the JSON file
import { WorkingCapitalRatio } from "../../../src/metrics/WorkingCapitalRatio"; // Import the WorkingCapitalRatio function to test

// Mock the dependencies to isolate the function under test
jest.mock("../../../src/util/ReadDataFile.js"); // Mock ReadDataFile to simulate file reading
jest.mock("../../../src/util/Formater.js"); // Mock formatPercentage to simulate formatting

describe("Working Capital Ratio", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test to ensure no carry-over between tests
  });

  // Test case for verifying the calculation of the Working Capital Ratio
  test("Calculate Working Capital Ratio Correctly", (done) => {
    const formattedResult = "40.3%"; // Expected result after formatting the calculated working capital ratio
    const finalData = data.data; // Extract the data array from the imported JSON

    // Mock the ReadDataFile to simulate reading the data from the JSON file
    ReadDataFile.mockImplementation((filePath, callback) => {
      callback(null, finalData); // Simulate successfully reading the file and passing finalData to the callback
    });

    // Mock the formatPercentage function to return the expected formatted result
    formatPercentage.mockImplementation((value) => formattedResult);

    // Calculate the debit and credit values for assets
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
      .reduce((sum, value) => sum + value, 0); // Sum all the debit values for assets

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
      .reduce((sum, value) => sum + value, 0); // Sum all the credit values for assets

    const assets = debitAssets - creditAssets; // Calculate net assets by subtracting credit assets from debit assets

    // Calculate the debit and credit values for liabilities
    const debitLiabilities = finalData
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "debit" &&
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0); // Sum all the debit values for liabilities

    const creditLiabilities = finalData
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "credit" &&
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0); // Sum all the credit values for liabilities

    const liabilities = creditLiabilities - debitLiabilities; // Calculate net liabilities by subtracting debit liabilities from credit liabilities

    // Calculate the Working Capital Ratio using the formula: (assets / liabilities) * 100
    const workingcapitalratio = (assets / liabilities) * 100;

    // Call the WorkingCapitalRatio function and pass the mock callback to verify the result
    WorkingCapitalRatio((err, result) => {
      expect(err).toBeNull(); // Ensure no error occurred during the calculation
      expect(ReadDataFile).toHaveBeenCalledWith(
        "src/data/data.json", // Ensure the correct file path was passed to ReadDataFile
        expect.any(Function) // Ensure the callback function was passed to ReadDataFile
      );
      expect(formatPercentage).toHaveBeenCalledWith(workingcapitalratio); // Ensure formatPercentage was called with the calculated working capital ratio
      expect(result).toBe(formattedResult); // Verify that the result matches the expected formatted result
      done(); // Indicate that the asynchronous test is complete
    });
  });
});
