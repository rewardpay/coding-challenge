/**
 * @fileoverview Test suite for currency and percentage formatting functions
 * Tests various scenarios including edge cases and different number formats
 */

import { formatAsCurrencyString, formatAsPercentageString } from '../src/format';

describe('Currency Formatting', () => {
  /**
   * Tests currency string formatting
   * Verifies:
   * - Dollar sign prefix
   * - Proper comma separators
   * - Whole number handling
   */
  it('should format currency with $ prefix and proper separators', () => {
    expect(formatAsCurrencyString(519169)).toBe('$519,169');
    expect(formatAsCurrencyString(1234567)).toBe('$1,234,567');
  });

  /**
   * Tests decimal number handling
   * Verifies that cents are removed as per README specs
   */
  it('should remove cents from currency values', () => {
    expect(formatAsCurrencyString(411664.75)).toBe('$411,664');
    expect(formatAsCurrencyString(1234.56)).toBe('$1,234');
  });

  /**
   * Tests edge cases for currency formatting
   * Verifies handling of small numbers and zero
   */
  it('should handle small numbers and zero correctly', () => {
    expect(formatAsCurrencyString(123)).toBe('$123');
    expect(formatAsCurrencyString(0)).toBe('$0');
  });
});

describe('Percentage Formatting', () => {
  /**
   * Tests basic percentage formatting
   * Verifies:
   * - One decimal place
   * - Percentage symbol suffix
   * - Correct rounding
   */
  it('should format percentages with one decimal place and % suffix', () => {
    expect(formatAsPercentageString(21.23)).toBe('21.2%');
    expect(formatAsPercentageString(95.67)).toBe('95.7%');
  });

  /**
   * Tests rounding behavior for percentages
   * Verifies correct decimal rounding
   */
  it('should round percentages correctly', () => {
    expect(formatAsPercentageString(22.55)).toBe('22.6%');
    expect(formatAsPercentageString(21.44)).toBe('21.4%');
  });

  /**
   * Tests edge cases for percentage formatting
   * Verifies handling of whole numbers and zero
   */
  it('should handle whole numbers and zero with proper decimals', () => {
    expect(formatAsPercentageString(95)).toBe('95.0%');
    expect(formatAsPercentageString(0)).toBe('0.0%');
    expect(formatAsPercentageString(99.9999)).toBe('100.0%');
  });
});
