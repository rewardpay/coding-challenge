import { 
  calculateTotalRevenue, 
  calculateTotalExpenses, 
  calculateGrossProfitMargin, 
  calculateNetProfitMargin, 
  calculateWorkingCapitalRatio 
} from '../src/calculations';
import { DataItem } from '../types';

describe('Calculations', () => {
  /**
   * Mock financial data for testing
   * Includes various account categories and types to cover different scenarios
   */
  const mockData: DataItem[] = [
    // Revenue entries
    {
      account_category: "revenue",
      account_type: "sales",
      value_type: "credit",
      total_value: 10000,
      account_code: "200",
      account_currency: "AUD",
      account_identifier: "e2bacdc6-2006-43c2-a5da-3c0e5f43b452",
      account_status: "ACTIVE",
      account_name: "Sales",
      account_type_bank: "",
      system_account: "",
    },
    // Expense entries
    {
      account_category: "expense",
      account_type: "overheads",
      value_type: "debit",
      total_value: 5000,
      account_code: "400",
      account_currency: "AUD",
      account_identifier: "d392fe47-c99d-499e-a200-46709dd6b6e7",
      account_status: "ACTIVE",
      account_name: "Advertising",
      account_type_bank: "",
      system_account: "",
    },
    // Asset entries
    {
      account_category: "assets",
      account_type: "current",
      value_type: "debit",
      total_value: 8000,
      account_code: "610",
      account_currency: "AUD",
      account_identifier: "3dd5c80d-e109-4313-8c61-41648e33704f",
      account_name: "Accounts Receivable",
      account_status: "ACTIVE",
      system_account: "DEBTORS",
      account_type_bank: "",
    },
    {
      account_category: "assets",
      account_type: "current",
      value_type: "credit",
      total_value: 2000,
      account_code: "090",
      account_currency: "AUD",
      account_identifier: "13918178-849a-4823-9a31-57b7eac713d7",
      account_name: "Business Bank Account",
      account_status: "ACTIVE",
      system_account: "",
      account_type_bank: "BANK",
    },
    // Liability entries
    {
      account_category: "liability",
      account_type: "current",
      value_type: "credit",
      total_value: 6000,
      account_code: "800",
      account_currency: "AUD",
      account_identifier: "8e9c5166-d3fe-4e21-827a-f42753568e80",
      account_name: "Accounts Payable",
      account_status: "ACTIVE",
      system_account: "CREDITORS",
      account_type_bank: "",
    },
    {
      account_category: "liability",
      account_type: "current",
      value_type: "debit",
      total_value: 1000,
      account_code: "801",
      account_currency: "AUD",
      account_identifier: "c11b84a9-e90a-4094-83d7-b8494d195ecc",
      account_name: "Unpaid Expense Claims",
      account_status: "ACTIVE",
      system_account: "UNPAIDEXPCLM",
      account_type_bank: "",
    },
  ];

  describe('calculateTotalRevenue', () => {
    /**
     * Tests the total revenue calculation
     * Verifies that revenue entries are summed correctly
     */
    it('should calculate the total revenue correctly', () => {
      const revenue = calculateTotalRevenue(mockData);
      expect(revenue).toBe(10000);
    });

    /**
     * Tests the total revenue calculation with no revenue entries
     * Verifies that the function returns 0 when no revenue data is present
     */
    it('should return 0 if there are no revenue entries', () => {
      const noRevenueData = mockData.filter(item => item.account_category !== 'revenue');
      const revenue = calculateTotalRevenue(noRevenueData);
      expect(revenue).toBe(0);
    });
  });

  describe('calculateTotalExpenses', () => {
    /**
     * Tests the total expenses calculation
     * Verifies that expense entries are summed correctly
     */
    it('should calculate the total expenses correctly', () => {
      const expenses = calculateTotalExpenses(mockData);
      expect(expenses).toBe(5000);
    });

    /**
     * Tests the total expenses calculation with no expense entries
     * Verifies that the function returns 0 when no expense data is present
     */
    it('should return 0 if there are no expense entries', () => {
      const noExpenseData = mockData.filter(item => item.account_category !== 'expense');
      const expenses = calculateTotalExpenses(noExpenseData);
      expect(expenses).toBe(0);
    });
  });

  describe('calculateGrossProfitMargin', () => {
    /**
     * Tests the gross profit margin calculation
     * Verifies accurate percentage calculation based on sales and revenue
     */
    it('should calculate gross profit margin correctly', () => {
      const revenue = calculateTotalRevenue(mockData);
      const grossMargin = calculateGrossProfitMargin(mockData, revenue);
      expect(grossMargin).toBe(0); // (0 / 10000) * 100 = 0%
    });

    /**
     * Tests the gross profit margin calculation when revenue is zero
     * Verifies that an error is thrown as the calculation is undefined
     */
    it('should throw an error when revenue is zero', () => {
      expect(() => calculateGrossProfitMargin(mockData, 0)).toThrow(
        "Gross Profit Margin calculation is undefined: revenue is zero."
      );
    });
  });

  describe('calculateNetProfitMargin', () => {
    /**
     * Tests the net profit margin calculation
     * Verifies accurate percentage calculation based on revenue and expenses
     */
    it('should calculate net profit margin correctly', () => {
      const revenue = 10000;
      const expenses = 5000;
      const netMargin = calculateNetProfitMargin(revenue, expenses);
      expect(netMargin).toBe(50); // ((10000 - 5000) / 10000) * 100
    });

    /**
     * Tests the net profit margin calculation when revenue is zero
     * Verifies that an error is thrown as the calculation is undefined
     */
    it('should throw an error when revenue is zero', () => {
      expect(() => calculateNetProfitMargin(0, 5000)).toThrow(
        "Net Profit Margin calculation is undefined: revenue is zero."
      );
    });
  });

  describe('calculateWorkingCapitalRatio', () => {
    /**
     * Tests the working capital ratio calculation
     * Verifies accurate percentage calculation based on assets and liabilities
     */
    it('should calculate working capital ratio correctly', () => {
      const workingCapital = calculateWorkingCapitalRatio(mockData);
      // Current Assets: 8000 (debit) - 2000 (credit) = 6000
      // Current Liabilities: 6000 (credit) - 1000 (debit) = 5000
      // Ratio: (6000 / 5000) * 100 = 120%
      expect(workingCapital).toBe(120);
    });

    /**
     * Tests the working capital ratio calculation when liabilities are zero
     * Verifies that an error is thrown as the calculation is undefined
     */
    it('should throw an error when liabilities are zero', () => {
      const dataWithNoLiabilities = mockData.filter(item => item.account_category !== 'liability');
      expect(() => calculateWorkingCapitalRatio(dataWithNoLiabilities)).toThrow(
        "Working Capital Ratio calculation is undefined: liabilities are zero."
      );
    });
  });
});
