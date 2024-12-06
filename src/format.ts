/**
 * Formats a number as a currency string with USD symbol and thousands separators
 * @param numericalValue - The number to format
 * @returns Formatted currency string (e.g., "$1,234")
 */
export function formatAsCurrencyString(numericalValue: number): string {
  const wholeNumberValue = Math.floor(numericalValue);
  return "$" + wholeNumberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Formats a number as a percentage string with one decimal place
 * @param numericalValue - The number to format
 * @returns Formatted percentage string (e.g., "12.3%")
 */
export function formatAsPercentageString(numericalValue: number): string {
  return numericalValue.toFixed(1) + "%";
}