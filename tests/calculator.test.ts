import { AccountingCalculator } from '../src/service/calculator';
import { Account } from '../src/types/account';

describe('AccountingCalculator', () => {

    const mockData = [
        {
            account_category: 'revenue',
            account_type: 'sales',
            value_type: 'credit',
            total_value: 1000,
        },
        {
            account_category: 'expense',
            account_type: 'overheads',
            value_type: 'debit',
            total_value: 500,
        }
    ] as Account[];

    const calculator = new AccountingCalculator(mockData);

    test('calculateRevenue returns correct total', () => {
        expect(calculator.calculateRevenue()).toBe(1000);
    });

    test('calculateExpenses returns correct total', () => {
        expect(calculator.calculateExpenses()).toBe(500);
    });
    
});