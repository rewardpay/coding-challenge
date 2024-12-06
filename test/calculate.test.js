const assert = require('assert');
const { calculateRevenue } = require("../calculateMetrics");

describe('Metric Calculation Tests', function() {
  
  const data = [
    { account_category: 'revenue', total_value: 100 },
    { account_category: 'revenue', total_value: 200 },
    { account_category: 'expense', total_value: 50 },
    { account_category: 'expense', total_value: 30 },
    { account_category: 'assets', account_type: 'current', value_type: 'debit', total_value: 500 },
    { account_category: 'liability', account_type: 'current', value_type: 'credit', total_value: 200 },
    { account_category: 'sales', account_type: 'sales', value_type: 'debit', total_value: 300 },
  ];

  describe('calculateRevenue', function() {
    it('should calculate total revenue correctly', function() {
      const revenue = calculateRevenue(data);
      assert.strictEqual(revenue, 300);
    });
  });

 
});
