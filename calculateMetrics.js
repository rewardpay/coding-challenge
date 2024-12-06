exports.calculateRevenue = (data) => {
    const revenue = data
                    .filter(item => item.account_category === 'revenue')
                    .reduce((sum, item) => sum + item.total_value, 0);

    return revenue;
   
};

exports.calculateExpenses = (data) => {
    const expenses = data
                    .filter(item => item.account_category === 'expense')
                    .reduce((sum, item) => sum + item.total_value, 0);

    return expenses;
};

exports.calculateGrossProfit = (data, revenue) => {
   
    const salesDebitValue = data
                    .filter(item => item.account_type === 'sales' && item.value_type === 'debit')
                    .reduce((sum, item) => sum + item.total_value, 0);
   
    const grossProfit = (salesDebitValue / revenue) * 100;
    return grossProfit;
};

exports.calculateNetProfit = (revenue, expenses) => {
   
    const netProfit = ((revenue - expenses) / revenue ) * 100;
    return netProfit;
};

exports.calculateWorkingCapitalRatio = (data) => {
   
    const assets = data
                    .filter(item => item.account_category === 'assets' && ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type))
                    .reduce((sum, item) => item.value_type === 'debit' ? sum + item.total_value : sum - item.total_value, 0);

   const liabilities = data
                        .filter(item => item.account_category === 'liability' && ['current', 'current_accounts_payable'].includes(item.account_type))
                        .reduce((sum, item) => item.value_type === 'credit' ? sum + item.total_value : sum - item.total_value, 0);

  return (assets / liabilities) * 100;
};


