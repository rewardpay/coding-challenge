import { describe, it, expect } from "vitest";
const {
  formatCurrency,
  formatPercentage,
  createFileOutputLine,
} = require("../../src/helpers/dataFormatting");

describe("formatCurrency", () => {
  it("should format whole numbers correctly", () => {
    expect(formatCurrency(1234567)).to.equal("$1,234,567");
  });

  it("should remove cents from the value", () => {
    expect(formatCurrency(1234567.89)).to.equal("$1,234,567");
  });

  it("should throw an error if the input is not a number", () => {
    expect(() => formatCurrency("not a number")).to.throw(
      "Value must be a number"
    );
  });

  it("should format 0 correctly", () => {
    expect(formatCurrency(0)).to.equal("$0");
  });
});

describe("formatPercentage", () => {
  it("should format whole numbers correctly", () => {
    expect(formatPercentage(50)).to.equal("50.0%");
  });

  it("should round to one decimal place", () => {
    expect(formatPercentage(56.789)).to.equal("56.8%");
  });

  it("should handle 0 correctly", () => {
    expect(formatPercentage(0)).to.equal("0%");
  });

  it("should throw an error if the input is not a number", () => {
    expect(() => formatPercentage("not a number")).to.throw(
      "Value must be a number"
    );
  });
});

describe("createFileOutputLine", () => {
  it("should format output with correct padding for a short header", () => {
    const result = createFileOutputLine("Revenue", "$1000");
    expect(result).to.equal("                  Revenue:  $1000");
  });

  it("should handle headers exactly 25 characters long", () => {
    const result = createFileOutputLine("1234567890123456789012345", "$500");
    expect(result).to.equal("1234567890123456789012345:  $500");
  });

  it("should handle empty headers and values gracefully", () => {
    const result = createFileOutputLine("", "");
    expect(result).to.equal("                         :  ");
  });
});
