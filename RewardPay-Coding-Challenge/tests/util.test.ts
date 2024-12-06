import { dollarFormatting, percentageFormatting } from "../utils/formatUtils"

test("FORMAT-DOLLAR-CASE-1: Formatted dollar CORRECTLY and INCORRECTLY", () => {
    const testDollar_1 = 1234567890.1122334;
    const testDollar_2 = 0.5233234;
    const testDollar_3 = 1234.999;

    expect(dollarFormatting(testDollar_1)).toBe("$1,234,567,890");
    expect(dollarFormatting(testDollar_1)).not.toBe("$12,34,567,890");
    expect(dollarFormatting(testDollar_2)).toBe("$0");
    expect(dollarFormatting(testDollar_2)).not.toBe("0");
    expect(dollarFormatting(testDollar_3)).toBe("$1,234");
    expect(dollarFormatting(testDollar_3)).not.toBe("$1,235");
})

test("FORMAT-PERCENTAGE-CASE-1: Formateed percentage CORRECTLY and INCORRECTLY", () => {
    const testPercentage_1 = 0.1234;
    const testPercentage_2 = 0.1294;
    const testPercentage_3 = 0.1299;

    expect(percentageFormatting(testPercentage_1)).toBe("12.3%");
    expect(percentageFormatting(testPercentage_2)).toBe("12.9%");
    expect(percentageFormatting(testPercentage_3)).toBe("13.0%");
    expect(percentageFormatting(testPercentage_3)).not.toBe("12.9%");
})