export const formatCurrency = (value) => {
  return `$${Math.round(value).toLocaleString()}`;
};
export const formatPercentage = (value) => {
  return `${value.toFixed(0)}%`;
};
