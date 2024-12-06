const fs = require('fs');//importing xfile system 

// Function for reading and parsing the data.json file
function readDataFile(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(rawData);
        return parsedData.data; 
    } catch (error) {
        console.error('Error File not found','Error Description:', error);//setting error if file not found
    }
}

// Formatting the numbers as money
function formatCurrency(value) {
    return `$${Math.floor(value).toLocaleString('en-US')}`; // adding dollar in  front $ sign because it will display with value     each time
}

// Format numbers as percentages
function formatPercentage(value) {
    return `${value.toFixed(1)}%`;// adding % in  end % sign because it will display with value each time
}

// calculate metrics
function calculateMetrics(data) {
    let revenue = 0;
    let expenses = 0;
    let grossProfitSales = 0;
    let assetsDebit = 0, assetsCredit = 0;
    let liabilitiesCredit = 0, liabilitiesDebit = 0;

    // Looping through each entry
    data.forEach(item => {
        const { account_category, value_type, account_type, total_value } = item;

        // Revenue: Sum of "total_value" for "revenue" category
        if (account_category === 'revenue') {
            revenue += total_value;
        }

        // Expenses: Sum of "total_value" for "expense" category
        if (account_category === 'expense') {
            expenses += total_value;
        }

        // Gross Profit Sales: Sum of "total_value" for sales and debit
        if (account_type === 'sales' && value_type === 'debit') {
            grossProfitSales += total_value;
        }

        // Assets (debit/credit) for Working Capital Ratio
        if (
            account_category === 'assets' &&
            ['current', 'bank', 'current_accounts_receivable'].includes(account_type)
        ) {
            if (value_type === 'debit') {
                assetsDebit += total_value;
            } else if (value_type === 'credit') {
                assetsCredit += total_value;
            }
        }

        // Liabilities (credit/debit) for Working Capital Ratio
        if (
            account_category === 'liability' &&
            ['current', 'current_accounts_payable'].includes(account_type)
        ) {
            if (value_type === 'credit') {
                liabilitiesCredit += total_value;
            } else if (value_type === 'debit') {
                liabilitiesDebit += total_value;
            }
        }
    });

    // Main Calculations
    const grossProfitMargin = (grossProfitSales / revenue) * 100;
    const netProfitMargin = ((revenue - expenses) / revenue) * 100;
    const assets = assetsDebit - assetsCredit;
    const liabilities = liabilitiesCredit - liabilitiesDebit;
    const workingCapitalRatio = (assets / liabilities) * 100;

    return { revenue, expenses, grossProfitMargin, netProfitMargin, workingCapitalRatio };
}

// Main Function
function main() {
    const filePath = './data.json'; // Path to your JSON file
    const data = readDataFile(filePath); // Read and parse data

    if (!Array.isArray(data)) {
        console.error('Error: The "data" key must be an array. Check your JSON structure.');
        process.exit(1);
    }

    const metrics = calculateMetrics(data); // Calculate metrics

    // Output results
    console.log('Revenue:', formatCurrency(metrics.revenue));
    console.log('Expenses:', formatCurrency(metrics.expenses));
    console.log('Gross Profit Margin:', formatPercentage(metrics.grossProfitMargin));
    console.log('Net Profit Margin:', formatPercentage(metrics.netProfitMargin));
    console.log('Working Capital Ratio:', formatPercentage(metrics.workingCapitalRatio));
}

// Run the program
main();