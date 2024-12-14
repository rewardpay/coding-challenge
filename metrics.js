function formatCurrency(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

function formatPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
}

function calculateMetrics(data) {
    const revenue = data
        .filter(item => item.account_category === 'revenue')
        .reduce((sum, item) => sum + item.total_value, 0);

    const expenses = data
        .filter(item => item.account_category === 'expense')
        .reduce((sum, item) => sum + item.total_value, 0);

    const grossProfitMargin = data
        .filter(item => item.account_type === 'sales' && item.value_type === 'debit')
        .reduce((sum, item) => sum + item.total_value, 0) / revenue;

    const netProfitMargin = (revenue - expenses) / revenue;

    const assets = data
        .filter(item => item.account_category === 'assets' &&
            ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type))
        .reduce((sum, item) =>
            sum + (item.value_type === 'debit' ? item.total_value : -item.total_value), 0);

    const liabilities = data
        .filter(item => item.account_category === 'liability' &&
            ['current', 'current_accounts_payable'].includes(item.account_type))
        .reduce((sum, item) =>
            sum + (item.value_type === 'credit' ? item.total_value : -item.total_value), 0);

    const workingCapitalRatio = assets / liabilities;

    return {
        revenue: formatCurrency(revenue),
        expenses: formatCurrency(expenses),
        grossProfitMargin: formatPercentage(grossProfitMargin),
        netProfitMargin: formatPercentage(netProfitMargin),
        workingCapitalRatio: formatPercentage(workingCapitalRatio),
    };
}

module.exports = { calculateMetrics };
