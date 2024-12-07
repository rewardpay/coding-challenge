var helper = require('./main')

describe('Financial calculations', () => {

    describe('calculateRevenue', () => {
      it('should return the correct revenue total', () => {
        const accounts = [
          { account_category: 'revenue', total_value: 1000 },
          { account_category: 'expense', total_value: 500 },
          { account_category: 'revenue', total_value: 2000 },
        ];
  
        expect(helper.calculateRevenue(accounts)).toBe(3000);
      });
  
      it('should return 0 if there are no revenue accounts', () => {
        const accounts = [
          { account_category: 'expense', total_value: 500 },
          { account_category: 'expense', total_value: 300 },
        ];
  
        expect(helper.calculateRevenue(accounts)).toBe(0);
      });
    });
  
    describe('calculateExpenses', () => {
      it('should return the correct expenses total', () => {
        const accounts = [
          { account_category: 'expense', total_value: 1000 },
          { account_category: 'revenue', total_value: 500 },
          { account_category: 'expense', total_value: 2000 },
        ];
  
        expect(helper.calculateExpenses(accounts)).toBe(3000);
      });
  
      it('should return 0 if there are no expense accounts', () => {
        const accounts = [
          { account_category: 'revenue', total_value: 500 },
          { account_category: 'revenue', total_value: 300 },
        ];
  
        expect(helper.calculateExpenses(accounts)).toBe(0);
      });
    });
  
    describe('calculateGrossProfitMargin', () => {
      it('should return the correct gross profit margin', () => {
        const accounts = [
          { account_type: 'sales', value_type: 'debit', total_value: 5000 },
          { account_category: 'revenue', total_value: 10000 },
        ];
        const revenue = 10000;
  
        expect(helper.calculateGrossProfitMargin(accounts, revenue)).toBe(0.5);
      });
  
      it('should return 0 if revenue is 0', () => {
        const accounts = [
          { account_type: 'sales', value_type: 'debit', total_value: 5000 },
        ];
        const revenue = 0;
  
        expect(helper.calculateGrossProfitMargin(accounts, revenue)).toBe(0);
      });
    });
  
    describe('calculateNetProfitMargin', () => {
      it('should return the correct net profit margin', () => {
        const revenue = 10000;
        const expenses = 4000;
  
        expect(helper.calculateNetProfitMargin(expenses, revenue)).toBe(0.6);
      });
  
      it('should return 0 if revenue is 0', () => {
        const revenue = 0;
        const expenses = 4000;
  
        expect(helper.calculateNetProfitMargin(expenses, revenue)).toBe(0);
      });
    });

    describe('calculateWorkingCapitalRatio', () => {
        it('should return the correct working capital ratio', () => {
          const accounts = [
            // Assets (Debit, Current, Bank, etc.)
            { account_category: 'assets', account_type: 'current', value_type: 'debit', total_value: 5000 },
            { account_category: 'assets', account_type: 'bank', value_type: 'debit', total_value: 2000 },
            { account_category: 'assets', account_type: 'current_accounts_receivable', value_type: 'debit', total_value: 3000 },

      
            // Liabilities (Credit, Current, Current Accounts Payable)
            { account_category: 'liability', account_type: 'current', value_type: 'credit', total_value: 3000 },
            { account_category: 'liability', account_type: 'current_accounts_payable', value_type: 'credit', total_value: 1000 },

          ];

          const assets = 10000;
      
          const liabilities = 4000;
          expect(helper.calculateWorkingCapitalRatio(accounts)).toBe(assets/liabilities);
        });
      });
  
  });
