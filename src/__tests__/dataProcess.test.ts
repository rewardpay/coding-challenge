import { mockJsonData, mockInvalidJsonData } from "../mock";
// Import the function to test
import { dataProcess } from "../index";

describe("dataProcess", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly calculate and format financial metrics with valid data", () => {
    // Call the function
    const result = dataProcess(mockJsonData);
    // Note: dataProcess to be mocked

    // Verify calculations
    expect(result).toEqual({
      revenue: 32431,
      expenses: 36530,
      grossProfitMargin: 0,
      netProfitMargin: -0.126,
      workingCapitalRatio: 1.188,
    });
  });

  it("should throw an error if data validation fails", () => {
    // Call the function and expect an error
    expect(() => dataProcess(mockInvalidJsonData)).toThrow("Invalid data type");
  });
});
