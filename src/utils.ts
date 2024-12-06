export const formatCurrency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

// Format as percentage
export const formatPercentage = new Intl.NumberFormat("en-AU", {
  style: "percent",
  maximumFractionDigits: 1,
});
