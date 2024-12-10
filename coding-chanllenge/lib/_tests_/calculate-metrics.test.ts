import { calculateMetrics } from '@/lib/calculate-metrics';

// Mock the data module before importing the functions
jest.mock('@/data.json', () => ({
  data: [
    {
      account_category: "revenue",
      account_name: "Sales",
      account_type: "sales",
      value_type: "credit",
      total_value: 1000.00
    },
    {
      account_category: "expense",
      account_name: "Rent",
      account_type: "sales",
      value_type: "debit",
      total_value: 300.00
    },
    {
      account_category: "assets",
      account_name: "Bank Account",
      account_type: "bank",
      value_type: "debit",
      total_value: 5000.00
    },
    {
      account_category: "assets",
      account_name: "Accounts Receivable",
      account_type: "current_accounts_receivable",
      value_type: "debit",
      total_value: 2000.00
    },
    {
      account_category: "liability",
      account_name: "Accounts Payable",
      account_type: "current_accounts_payable",
      value_type: "credit",
      total_value: 1000.00
    }
  ]
}));

describe('Financial Metrics Calculations', () => {
  const metrics = calculateMetrics();

  describe('Revenue Calculation', () => {
    test('should calculate total revenue correctly', () => {
      expect(metrics.revenue).toBe(1000);
    });
  });

  describe('Expenses Calculation', () => {
    test('should calculate total expenses correctly', () => {
      expect(metrics.expenses).toBe(300);
    });
  });

  describe('Gross Profit Margin Calculation', () => {
    test('should calculate gross profit margin correctly', () => {
      // Based on sales value / revenue * 100
      const expectedGrossMargin = 30; // Since all sales are gross profit
      expect(metrics.grossProfitMargin).toBe(expectedGrossMargin);
    });
  });

  describe('Net Profit Margin Calculation', () => {
    test('should calculate net profit margin correctly', () => {
      // (Revenue - Expenses) / Revenue * 100
      const expectedNetMargin = ((1000 - 300) / 1000) * 100; // 70%
      expect(metrics.netProfitMargin).toBe(expectedNetMargin);
    });
  });

  describe('Working Capital Ratio Calculation', () => {
    test('should calculate working capital ratio as a percentage', () => {
      // Total Current Assets / Total Current Liabilities * 100
      const expectedRatio = ((5000 + 2000) / 1000) * 100; // 700%
      expect(metrics.workingCapitalRatio).toBe(expectedRatio);
    });
  });


});