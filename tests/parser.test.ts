import { parseAccountData } from "../src/utils/parser";
import fs from "fs";
import { Account } from "../src/types/account";

// Mock fs module
jest.mock("fs");

describe("parseAccountData", () => {
  const mockValidData = {
    data: [
      {
        account_category: "revenue",
        account_code: "123",
        account_currency: "USD",
        account_identifier: "REV123",
        account_name: "Test Account",
        account_status: "active",
        account_type: "sales",
        account_type_bank: "",
        system_account: "true",
        total_value: 1000,
        value_type: "debit",
      },
    ] as Account[],
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("successfully parses valid JSON data", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify(mockValidData)
    );

    const result = parseAccountData("dummy.json");
    expect(result).toHaveLength(1);
    expect(result[0].account_category).toBe("revenue");
    expect(result[0].total_value).toBe(1000);
  });

  test("throws error for invalid JSON", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("invalid json");

    expect(() => {
      parseAccountData("dummy.json");
    }).toThrow();
  });

  test("throws error when file cannot be read", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => {
      parseAccountData("nonexistent.json");
    }).toThrow("File not found");
  });

  test("handles empty data array", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ data: [] })
    );

    const result = parseAccountData("dummy.json");
    expect(result).toHaveLength(0);
  });
});
