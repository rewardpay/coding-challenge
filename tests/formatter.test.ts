import { Formatter } from "../src/utils/formatter";

describe("Formatter", () => {
  describe("formatCurrency", () => {
    test("formats whole numbers with $ prefix", () => {
      expect(Formatter.formatCurrency(1000)).toBe("$1,000");
    });

    test("handles zero", () => {
      expect(Formatter.formatCurrency(0)).toBe("$0");
    });

    test("rounds decimal numbers", () => {
      expect(Formatter.formatCurrency(1234.56)).toBe("$1,235");
    });

    test("formats large numbers with commas", () => {
      expect(Formatter.formatCurrency(1234567)).toBe("$1,234,567");
    });
  });

  describe("formatPercentage", () => {
    test("formats decimal to percentage", () => {
      expect(Formatter.formatPercentage(0.156)).toBe("15.6%");
    });

    test("handles zero", () => {
      expect(Formatter.formatPercentage(0)).toBe("0.0%");
    });

    test("handles one", () => {
      expect(Formatter.formatPercentage(1)).toBe("100.0%");
    });

    test("rounds to one decimal place", () => {
      expect(Formatter.formatPercentage(0.12345)).toBe("12.3%");
    });
  });
});
