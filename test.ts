import { 
    Revenue, 
    Expenses, 
    GrossProfitMargin, 
    NetProfitMargin, 
    WorkingCapitalRatio } 
    from './src/Calculations';
  
  describe('Calculations', () => {
    const accounts = [
      { account_category: 'revenue', value_type: 'credit', total_value: 32431.0, account_type: 'sales' },
      { account_category: 'expense', value_type: 'debit', total_value: 1830.18, account_type: 'overheads' },
      { account_category: 'expense', value_type: 'debit', total_value: 31.5, account_type: 'overheads' },
      { account_category: 'expense', value_type: 'debit', total_value: 310.0, account_type: 'overheads' },
      { account_category: 'expense', value_type: 'debit', total_value: 477.2, account_type: 'overheads' },
      { account_category: 'assets', value_type: 'debit', total_value: 10749.5, account_type: 'current_accounts_receivable' },
      { account_category: 'assets', value_type: 'debit', total_value: 1065.0, account_type: 'bank' },
      { account_category: 'liability', value_type: 'credit', total_value: 5000.0, account_type: 'current' }
    ];
  
    it('calculates revenue correctly', () => {
      const revenue = Revenue(accounts);
      expect(revenue).toBe(32431.0);
    });
  
    it('calculates expenses correctly', () => {
      const expenses = Expenses(accounts);
      expect(expenses).toBe(2648.88);
    });
  
    
  
    it('calculates net profit margin correctly', () => {
      const revenue = Revenue(accounts);
      const expenses = Expenses(accounts);
      const netProfitMargin = NetProfitMargin(revenue, expenses);
      expect(netProfitMargin).toBe('91.8%');
    });
  
    
  });
  