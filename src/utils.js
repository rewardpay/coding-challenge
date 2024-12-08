export function formatCurrency(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function formatPercentage(value) {
  return `${(value * 100).toFixed(1)}%`;
}
