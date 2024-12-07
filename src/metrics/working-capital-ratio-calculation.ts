// Working Capital Ratio Calculation Function
export function calculateWorkingCapitalRatio(data: any[]): number {
    const assets = data
        .filter(item =>
            item.account_category === 'assets' &&
            item.value_type === 'debit' &&
            ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type)
        )
        .reduce((sum, item) => sum + item.total_value, 0) -
        data
            .filter(item =>
                item.account_category === 'assets' &&
                item.value_type === 'credit' &&
                ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type)
            )
            .reduce((sum, item) => sum + item.total_value, 0);
   
    const liabilities = data
        .filter(item =>
            item.account_category === 'liability' &&
            item.value_type === 'credit' &&
            ['current', 'current_accounts_payable'].includes(item.account_type)
        )
        .reduce((sum, item) => sum + item.total_value, 0) -
        data
            .filter(item =>
                item.account_category === 'liability' &&
                item.value_type === 'debit' &&
                ['current', 'current_accounts_payable'].includes(item.account_type)
            )
            .reduce((sum, item) => sum + item.total_value, 0);
 
 
    return (assets / liabilities) * 100;
 }
 