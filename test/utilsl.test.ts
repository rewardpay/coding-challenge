import {
    readJsonFile,
    formatValue,
    formatCurrency 
} from "../src/utils";

import fs from "fs";

//test readJsonFile
jest.mock("fs");

describe("readJsonFile", () => {
    it("read and parse a valid JSON file", () => {
      const mockData = JSON.stringify({ key: "value" });
      (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
  
      const result = readJsonFile("mockFilePath.json");
      expect(result).toEqual({ key: "value" });
    });
  
    it("throw an error if the file does not exist", () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error("File not found");
      });
  
      expect(() => readJsonFile("invalidFilePath.json")).toThrow(
        "Error reading or parsing the file: invalidFilePath.json"
      );
    });
  
    it("throw an error if the file content is not valid JSON", () => {
      (fs.readFileSync as jest.Mock).mockReturnValue("invalid JSON");
  
      expect(() => readJsonFile("mockFilePath.json")).toThrow(
        "Error reading or parsing the file: mockFilePath.json"
      );
    });
  });

  //test formatCurrency
  describe("formatCurrency", () => {
    it("format correct currency", () => {
      expect(formatCurrency(1200)).toBe("$1,200");
    });
  
    it("format zero as currency", () => {
      expect(formatCurrency(0)).toBe("$0");
    });
  });

  //test formatValue
  describe("formatValue", () => {
    it("should format a positive number as a percentage", () => {
      expect(formatValue(0.1234)).toBe("12.3%");
    });
  
    it("should format zero as 0.0%", () => {
      expect(formatValue(0)).toBe("0.0%");
    });
  });