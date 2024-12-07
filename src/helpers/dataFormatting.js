const { FILE_SPACING_PADDING } = require("../config");

/**
 * Formats a number as a currency string.
 * @param {number} value - The number to be formatted.
 * @returns {string} - The formatted currency string.
 */
function formatCurrency(value) {
  if (isNaN(+value)) {
    throw new TypeError("Value must be a number");
  }
  return `$${Math.floor(+value).toLocaleString("en-US")}`;
}

/**
 * Formats a number as a percentage string.
 * @param {number} value - The decimal value to be formatted as a percentage.
 * @returns {string} - The formatted percentage string.
 */
function formatPercentage(value) {
  if (isNaN(+value)) {
    throw new TypeError("Value must be a number");
  }
  return `${(+value).toFixed(1)}%`;
}

function createFileOutputLine(header, value) {
  return `${" ".repeat(
    FILE_SPACING_PADDING - header.length
  )}${header}:  ${value}`;
}

module.exports = { formatCurrency, formatPercentage, createFileOutputLine };
