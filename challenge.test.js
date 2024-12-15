const { calculateRevenue, calculateExpenses } = require('./challenge');

const mockData = [
    { account_category: 'revenue', total_value: 32431.0 },
    { account_category: 'expense', total_value: 1830.18 },
    { account_category: 'expense', total_value: 310.0 },
];

test('calculateRevenue correctly sums revenue values', () => {
    expect(calculateRevenue(mockData)).toBe(32431);
});

test('calculateExpenses correctly sums expense values', () => {
    expect(calculateExpenses(mockData)).toBeCloseTo(2140.18, 2);
});
