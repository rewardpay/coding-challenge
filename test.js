const fs = require('fs');

// Helper function to format currency
const formatCurrency = (value) => {
    return `$${Math.round(value).toLocaleString()}`;
};

// Helper function to format percentages
const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
};

// Load data from JSON
const rawData = fs.readFileSync('data.json', 'utf-8');
const data = JSON.parse(rawData).data;

// Calculate Revenue
const revenue = data
    .filter(record => record.account_category === 'revenue')
    .reduce((sum, record) => sum + record.total_value, 0);

// Calculate Expenses
const expenses = data
    .filter(record => record.account_category === 'expense')
    .reduce((sum, record) => sum + record.total_value, 0);

// Calculate Gross Profit Margin
const salesDebit = data
    .filter(record => record.account_type === 'sales' && record.value_type === 'debit')
    .reduce((sum, record) => sum + record.total_value, 0);
const grossProfitMargin = salesDebit / revenue;

// Calculate Net Profit Margin
const netProfitMargin = (revenue - expenses) / revenue;

// Calculate Working Capital Ratio
const assetsDebit = data
    .filter(record =>
        record.account_category === 'assets' &&
        record.value_type === 'debit' &&
        ['current', 'bank', 'current_accounts_receivable'].includes(record.account_type)
    )
    .reduce((sum, record) => sum + record.total_value, 0);

const assetsCredit = data
    .filter(record =>
        record.account_category === 'assets' &&
        record.value_type === 'credit' &&
        ['current', 'bank', 'current_accounts_receivable'].includes(record.account_type)
    )
    .reduce((sum, record) => sum + record.total_value, 0);

const liabilitiesCredit = data
    .filter(record =>
        record.account_category === 'liability' &&
        record.value_type === 'credit' &&
        ['current', 'current_accounts_payable'].includes(record.account_type)
    )
    .reduce((sum, record) => sum + record.total_value, 0);

const liabilitiesDebit = data
    .filter(record =>
        record.account_category === 'liability' &&
        record.value_type === 'debit' &&
        ['current', 'current_accounts_payable'].includes(record.account_type)
    )
    .reduce((sum, record) => sum + record.total_value, 0);

const assets = assetsDebit - assetsCredit;
const liabilities = liabilitiesCredit - liabilitiesDebit;
const workingCapitalRatio = assets / liabilities;

// Print Results
console.log(`Revenue: ${formatCurrency(revenue)}`);
console.log(`Expenses: ${formatCurrency(expenses)}`);
console.log(`Gross Profit Margin: ${formatPercentage(grossProfitMargin)}`);
console.log(`Net Profit Margin: ${formatPercentage(netProfitMargin)}`);
console.log(`Working Capital Ratio: ${formatPercentage(workingCapitalRatio)}`);