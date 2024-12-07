export const formatCurrency = (value: number): string =>
    `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const formatPercentage = (value: number): string =>
    `${value.toFixed(1)}%`;