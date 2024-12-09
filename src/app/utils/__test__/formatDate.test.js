import { formatDate } from "../formatDate";

describe("formatDate function", () => {
  it("should format a valid date string correctly", () => {
    const result = formatDate("2024-12-09T12:00:00Z");
    expect(result).toBe("09/12/2024");
  });

  it("should format another valid date string correctly", () => {
    const result = formatDate("2023-01-01T00:00:00Z");
    expect(result).toBe("01/01/2023");
  });

  it("should format date with leading zeros", () => {
    const result = formatDate("2024-07-05T10:30:00Z");
    expect(result).toBe("05/07/2024");
  });

  it("should handle dates at the end of the month", () => {
    const result = formatDate("2024-02-29T00:00:00Z");
    expect(result).toBe("29/02/2024");
  });

  it("should handle invalid date input", () => {
    const result = formatDate("invalid-date");
    expect(result).toBe("NaN/NaN/NaN");
  });

  it("should handle an empty string input", () => {
    const result = formatDate("");
    expect(result).toBe("NaN/NaN/NaN");
  });

  it("should return the correct date for dates in different timezones", () => {
    const result = formatDate("2024-12-09T12:00:00-03:00");
    expect(result).toBe("09/12/2024");
  });
});
