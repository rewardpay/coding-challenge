
// Revenue Calculation Fucntion
export function calculateRevenue(data: any[]): number {
    return data
        .filter(item => item.account_category === 'revenue')  // Filter for revenue
        .reduce((total, item) => total + item.total_value, 0); // Sum total_value
}


// Expenses Calculation Function
export function calculateExpenses(data: any[]): number {
    return data
        .filter(item => item.account_category === 'expense')  // Filter for expenses
        .reduce((total, item) => total + item.total_value, 0); // Sum total_value
}

// Gross Profit Margin Calculation Function
export function calculateGrossProfitMargin(data: any[], revenue: number): number {
    const sales = data
        .filter(item => item.account_type === 'sales' && item.value_type === 'debit')
        .reduce((sum, item) => sum + item.total_value, 0);
    
    return (sales / revenue) * 100;
}

// Net Profit Margin Calculation Function
export function calculateNetProfitMargin(revenue: number, expenses: number): number {
    return ((revenue - expenses) / revenue) * 100;
}

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
