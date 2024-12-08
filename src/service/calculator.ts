import { Account } from '../types/account';

export class AccountingCalculator {
    private data: Account[];

    constructor(data: Account[]) {
        this.data = data;
    }
    calculateRevenue(): number {
        return this.data
            .filter(account => account.account_category === 'revenue')
            .reduce((sum, account) => sum + account.total_value, 0);
    }
    calculateExpenses(): number {
        return this.data
            .filter(account => account.account_category === 'expense')
            .reduce((sum, account) => sum + account.total_value, 0);
    }
    calculateGrossProfitMargin(): number {
        const salesValue = this.data
            .filter(account => 
                account.account_type === 'sales' && 
                account.value_type === 'debit'
            )
            .reduce((sum, account) => sum + account.total_value, 0);
        
        const revenue = this.calculateRevenue();
        return revenue !== 0 ? salesValue / revenue : 0;
    }

    calculateNetProfitMargin(): number {
        const revenue = this.calculateRevenue();
        const expenses = this.calculateExpenses();
        return revenue !== 0 ? (revenue - expenses) / revenue : 0;
    }
    private calculateCurrentAssets(): number {
        const validTypes = ['current','bank', 'current_accounts_receivable'];
        
        const debitAssets = this.data
            .filter(account => 
                account.account_category === 'assets' &&
                account.value_type === 'debit' &&
                validTypes.includes(account.account_type)
            )
            .reduce((sum, account) => sum + account.total_value, 0);

        const creditAssets = this.data
            .filter(account => 
                account.account_category === 'assets' &&
                account.value_type === 'credit' &&
                validTypes.includes(account.account_type)
            )
            .reduce((sum, account) => sum + account.total_value, 0);

        return debitAssets - creditAssets;
    }
    private calculateCurrentLiabilities(): number {
        const validTypes = ['current','current_accounts_payable'];
        
        const creditLiabilities = this.data
            .filter(account => 
                account.account_category === 'liability' &&
                account.value_type === 'credit' &&
                validTypes.includes(account.account_type)
            )
            .reduce((sum, account) => sum + account.total_value, 0);

        const debitLiabilities = this.data
            .filter(account => 
                account.account_category === 'liability' &&
                account.value_type === 'debit' &&
                validTypes.includes(account.account_type)
            )
            .reduce((sum, account) => sum + account.total_value, 0);

        return creditLiabilities - debitLiabilities;
    }
    calculateWorkingCapitalRatio(): number {
        const assets = this.calculateCurrentAssets();
        const liabilities = this.calculateCurrentLiabilities();
        return liabilities !== 0 ? assets / liabilities : 0;
    }
}
   
