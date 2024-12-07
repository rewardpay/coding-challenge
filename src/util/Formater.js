// Function to format a number as a currency string
export const formatCurrency = (value) => {
  // Round the value to the nearest integer, format with commas, and prepend a dollar sign
  return `$${Math.round(value).toLocaleString()}`;
};

// Function to format a number as a percentage
export const formatPercentage = (value) => {
  // Convert the value to a string with 1 decimal places and append a percentage sign
  return `${value.toFixed(1)}%`;
};
