// Function to calculate revenue
function calculateRevenue(data) {
    return data
        .filter(item => item.account_category === 'revenue')
        .reduce((sum, item) => sum + item.total_value, 0);
}

// Function to calculate expenses
function calculateExpenses(data) {
    return data
        .filter(item => item.account_category === 'expense')
        .reduce((sum, item) => sum + item.total_value, 0);
}

// Function to calculate gross profit margin
function calculateGrossProfitMargin(data, revenue) {
    const salesDebit = data
        .filter(item => item.account_type === 'sales' && item.value_type === 'debit')
        .reduce((sum, item) => sum + item.total_value, 0);
    return salesDebit / revenue;
}

// Function to calculate net profit margin
function calculateNetProfitMargin(revenue, expenses) {
    return (revenue - expenses) / revenue;
}

// Function to calculate working capital ratio
function calculateWorkingCapitalRatio(data) {
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

    return assets / liabilities;
}

// Helper function to format currency
function formatCurrency(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

// Helper function to format percentages
function formatPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
}

// Main function to read and process the data
function main(data) {
    const revenue = calculateRevenue(data);
    const expenses = calculateExpenses(data);
    const grossProfitMargin = calculateGrossProfitMargin(data, revenue);
    const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
    const workingCapitalRatio = calculateWorkingCapitalRatio(data);

    console.log(`Revenue: ${formatCurrency(revenue)}`);
    console.log(`Expenses: ${formatCurrency(expenses)}`);
    console.log(`Gross Profit Margin: ${formatPercentage(grossProfitMargin)}`);
    console.log(`Net Profit Margin: ${formatPercentage(netProfitMargin)}`);
    console.log(`Working Capital Ratio: ${formatPercentage(workingCapitalRatio)}`);
}

// Export functions for testing
module.exports = {
    calculateRevenue,
    calculateExpenses,
    calculateGrossProfitMargin,
    calculateNetProfitMargin,
    calculateWorkingCapitalRatio,
    formatCurrency,
    formatPercentage,
    main,
};