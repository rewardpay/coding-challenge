const fs = require('fs');

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// Helper function to format currency
function formatCurrency(value) {
    return `$${Math.round(value).toLocaleString()}`;
}

// Helper function to format percentages
function formatPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
}

// Calculate Revenue
const revenue = data.data
    .filter(item => item.account_category === 'revenue')
    .reduce((sum, item) => sum + item.total_value, 0);

// Calculate Expenses
const expenses = data.data
    .filter(item => item.account_category === 'expense')
    .reduce((sum, item) => sum + item.total_value, 0);

// Calculate Gross Profit Margin
const salesDebit = data.data
    .filter(item => item.account_type === 'sales' && item.value_type === 'debit')
    .reduce((sum, item) => sum + item.total_value, 0);
const grossProfitMargin = salesDebit / revenue;

// Calculate Net Profit Margin
const netProfitMargin = (revenue - expenses) / revenue;

// Calculate Working Capital Ratio
const assets = data.data
    .filter(item => 
        item.account_category === 'assets' && 
        item.value_type === 'debit' && 
        ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type))
    .reduce((sum, item) => sum + item.total_value, 0) -
    data.data
    .filter(item => 
        item.account_category === 'assets' && 
        item.value_type === 'credit' && 
        ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type))
    .reduce((sum, item) => sum + item.total_value, 0);

const liabilities = data.data
    .filter(item => 
        item.account_category === 'liability' && 
        item.value_type === 'credit' && 
        ['current', 'current_accounts_payable'].includes(item.account_type))
    .reduce((sum, item) => sum + item.total_value, 0) -
    data.data
    .filter(item => 
        item.account_category === 'liability' && 
        item.value_type === 'debit' && 
        ['current', 'current_accounts_payable'].includes(item.account_type))
    .reduce((sum, item) => sum + item.total_value, 0);

const workingCapitalRatio = assets / liabilities;

// Print the results
console.log(`Revenue: ${formatCurrency(revenue)}`);
console.log(`Expenses: ${formatCurrency(expenses)}`);
console.log(`Gross Profit Margin: ${formatPercentage(grossProfitMargin)}`);
console.log(`Net Profit Margin: ${formatPercentage(netProfitMargin)}`);
console.log(`Working Capital Ratio: ${formatPercentage(workingCapitalRatio)}`);