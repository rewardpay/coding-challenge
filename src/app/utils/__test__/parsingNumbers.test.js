
import { formatCurrency, parsePercentage } from '../parsingNumbers';

describe('formatCurrency', () => {
  test('formats positive whole numbers correctly', () => {
    expect(formatCurrency(1234)).toBe('$1,234');
    expect(formatCurrency(1000000)).toBe('$1,000,000');
  });

  test('formats positive decimal numbers by rounding them', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235');
    expect(formatCurrency(1000000.99)).toBe('$1,000,001');
  });

  test('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  test('formats negative numbers correctly', () => {
    expect(formatCurrency(-1234)).toBe('$-1,234');
    expect(formatCurrency(-1000000.99)).toBe('$-1,000,001');
  });

  test('handles very small positive numbers (less than 1)', () => {
    expect(formatCurrency(0.99)).toBe('$0');
    expect(formatCurrency(0.0001)).toBe('$0');
  });

  test('handles very small negative numbers (greater than -1)', () => {
    expect(formatCurrency(-0.99)).toBe('$0');
    expect(formatCurrency(-0.0001)).toBe('$0');
  });

  test('handles very large numbers', () => {
    expect(formatCurrency(1e12)).toBe('$1,000,000,000,000');
    expect(formatCurrency(1e18)).toBe('$1,000,000,000,000,000,000');
  });
});

describe('parsePercentage', () => {
  test('handles typical percentage values', () => {
    expect(parsePercentage(0.5)).toBe('50.0%');
    expect(parsePercentage(0.12345)).toBe('12.3%');
    expect(parsePercentage(1)).toBe('100.0%');
  });

  test('handles edge cases', () => {
    expect(parsePercentage(0)).toBe('0.0%'); // Zero
    expect(parsePercentage(1.0000001)).toBe('100.0%'); // Slightly above 1
    expect(parsePercentage(-0.5)).toBe('-50.0%'); // Negative values
  });

  test('handles large and small values', () => {
    expect(parsePercentage(10)).toBe('1000.0%'); // Large value
    expect(parsePercentage(0.0001)).toBe('0.0%'); // Very small value
    expect(parsePercentage(0.00015)).toBe('0.0%'); // Rounds down
    expect(parsePercentage(0.00016)).toBe('0.0%'); // Rounds up
  });

  test('handles rounding correctly', () => {
    expect(parsePercentage(0.12345)).toBe('12.3%'); // Proper rounding
    expect(parsePercentage(0.67895)).toBe('67.9%'); // Rounds up
    expect(parsePercentage(0.12344)).toBe('12.3%'); // Rounds down
  });
});