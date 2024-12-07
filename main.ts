var helper = require('./helper')
const dataFilePath = './data.json'

export function calculateRevenue(accounts: any): number {
    const revenue = accounts
    .filter((acc: any) => acc.account_category === 'revenue')
    .reduce((sum: number, acc: any) => sum + acc.total_value, 0)

    return revenue
}

export function calculateExpenses(accounts: any): number {
    const expenses = accounts
        .filter((acc: any) => acc.account_category === 'expense')
        .reduce((sum: number, acc: any) => sum + acc.total_value, 0)

    return expenses
}

export function calculateGrossProfitMargin(accounts: any, revenue: number): number {
    const salesDebit = accounts
    .filter((acc: any) => acc.account_type === 'sales' && acc.value_type === 'debit')
    .reduce((sum: number, acc: any) => sum + acc.total_value, 0)

    let grossProfitMargin = 0
    if (revenue !== 0) {
        grossProfitMargin = salesDebit / revenue
    }
    
    return grossProfitMargin
}

export function calculateNetProfitMargin(expenses: number, revenue: number): number {
    if (revenue !== 0) {
        return (revenue - expenses) / revenue
    }

    return 0
}

export function calculateWorkingCapitalRatio(accounts: any): number {
    const assets = accounts
    .filter((acc: any) =>
        acc.account_category === 'assets' &&
        ['current', 'bank', 'current_accounts_receivable'].includes(acc.account_type)
    )
    .reduce((sum: number, acc: any) =>
        acc.value_type === 'debit' ? sum + acc.total_value : sum - acc.total_value, 0);

    const liabilities = accounts
    .filter((acc: any) =>
        acc.account_category === 'liability' &&
        ['current', 'current_accounts_payable'].includes(acc.account_type)
    )
    .reduce((sum: number, acc: any) =>
        acc.value_type === 'credit' ? sum + acc.total_value : sum - acc.total_value, 0);


    let workingCapitalRatio = 0
    if (liabilities !== 0) {
        workingCapitalRatio = assets / liabilities
    }

    return workingCapitalRatio
    
}

function calculateMetrics(data: any) {
    const accounts = data.data;
    
    const revenue = calculateRevenue(accounts)
    const expenses = calculateExpenses(accounts)
    const grossProfitMargin = calculateGrossProfitMargin(accounts, revenue)
    const netProfitMargin = calculateNetProfitMargin(expenses, revenue)
    const workingCapitalRatio = calculateWorkingCapitalRatio(accounts)

    // Output results
    console.log("Revenue:", helper.formatCurrency(revenue));
    console.log("Expenses:", helper.formatCurrency(expenses));
    console.log("Gross Profit Margin:", helper.formatPercentage(grossProfitMargin));
    console.log("Net Profit Margin:", helper.formatPercentage(netProfitMargin));
    console.log("Working Capital Ratio:", helper.formatPercentage(workingCapitalRatio));
}

function main() {
    const data = helper.readData(dataFilePath);
    calculateMetrics(data);
}

// Run the script
main();
