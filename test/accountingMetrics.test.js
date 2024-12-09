const { calculateMetrics, formatCurrency, formatPercentage } = require('../accountingMetrics');

const mockData = {
  data: [
    { account_category: "revenue", total_value: 50000 },
    { account_category: "expense", total_value: 20000 },
    { account_category: "assets", account_type: "current", value_type: "debit", total_value: 30000 },
    { account_category: "assets", account_type: "current", value_type: "credit", total_value: 5000 },
    { account_category: "liability", account_type: "current", value_type: "credit", total_value: 15000 },
    { account_category: "liability", account_type: "current", value_type: "debit", total_value: 2000 },
    { account_category: "revenue", total_value: 25000 },
    { account_category: "expense", total_value: 5000 },
    { account_type: "sales", value_type: "debit", total_value: 15000 },
  ],
};

describe('Revenue and Expense Calculations', () => {
  it('should correctly calculate Revenue', () => {
    const metrics = calculateMetrics(mockData.data);
    expect(metrics.revenue).toBe('$75,000'); // 50000 + 25000
  });

  it('should correctly calculate Expenses', () => {
    const metrics = calculateMetrics(mockData.data);
    expect(metrics.expenses).toBe('$25,000'); // 20000 + 5000
  });
});

describe('Profit Margin Calculations', () => {
  it('should correctly calculate Gross Profit Margin', () => {
    const metrics = calculateMetrics(mockData.data);
    expect(metrics.grossProfitMargin).toBe('20.0%'); // 15000 / 75000
  });

  it('should correctly calculate Net Profit Margin', () => {
    const metrics = calculateMetrics(mockData.data);
    expect(metrics.netProfitMargin).toBe('66.7%'); // (75000 - 25000) / 75000
  });
});

describe('Working Capital Ratio Calculation', () => {
  it('should correctly calculate Working Capital Ratio', () => {
    const metrics = calculateMetrics(mockData.data);
    expect(metrics.workingCapitalRatio).toBe('192.3%'); // 25000 / 13000
  });
});

describe('Helper Function Tests', () => {
  describe('Currency Formatting', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234567.89)).toBe('$1,234,568');
    });
  });

  describe('Percentage Formatting', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(0.12345)).toBe('12.3%');
    });
  });
});
