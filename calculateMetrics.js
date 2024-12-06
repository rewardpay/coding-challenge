const formatCurrency = (value) => {
    return `$${Math.round(value).toLocaleString()}`;
};


exports.calculateRevenue = (data) => {
    const revenue = data
                    .filter(item => item.account_category === 'revenue')
                    .reduce((sum, item) => sum + item.total_value, 0);

    const formattedRevenue = formatCurrency(revenue);
    return formattedRevenue;
   
};

exports.calculateExpenses = (data) => {
    const expenses = data
                    .filter(item => item.account_category === 'expense')
                    .reduce((sum, item) => sum + item.total_value, 0);

    const formattedExpenses = formatCurrency(expenses);
    return formattedExpenses;
};
  

