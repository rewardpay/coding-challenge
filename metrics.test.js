const { calculateMetrics } = require('./metrics');

test('calculateMetrics should return correct metrics for given data', () => {
    const data = [
        {
            account_category: 'revenue',
            total_value: 50000,
            account_type: 'sales',
            value_type: 'debit',
        },
        {
            account_category: 'expense',
            total_value: 20000,
        },
        {
            account_category: 'assets',
            account_type: 'current',
            value_type: 'debit',
            total_value: 15000,
        },
        {
            account_category: 'liability',
            account_type: 'current',
            value_type: 'credit',
            total_value: 10000,
        },
    ];

    const metrics = calculateMetrics(data);

    expect(metrics.revenue).toBe('$50,000');
    expect(metrics.expenses).toBe('$20,000');
    expect(metrics.grossProfitMargin).toBe('100.0%');
    expect(metrics.netProfitMargin).toBe('60.0%');
    expect(metrics.workingCapitalRatio).toBe('150.0%');
});
