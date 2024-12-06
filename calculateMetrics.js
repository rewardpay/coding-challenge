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


