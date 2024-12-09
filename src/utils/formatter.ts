export class Formatter {
  static formatCurrency(value: number): string {
    return `$${Math.round(value).toLocaleString()}`;
  }

  static formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
  }
}
