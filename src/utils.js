export function formatCurrency(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}
