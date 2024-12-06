import { calculateRevenue } from '../src/metrics';
//import { parseData } from '../src/utils';
//const data = parseData('./data.json');
//console.log(data);
const mockData = [
    { account_category: 'revenue', total_value: 1000 },
    { account_category: 'revenue', total_value: 2000 },
    { account_category: 'expense', total_value: 500 },
];

test('calculates revenue correctly', () => {
    expect(calculateRevenue(mockData)).toBe(3000);
});
