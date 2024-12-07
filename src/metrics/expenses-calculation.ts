// Expenses Calculation Function
export function calculateExpenses(data: any[]): number {
    return data
        .filter(item => item.account_category === 'expense')  // Filter for expenses
        .reduce((total, item) => total + item.total_value, 0); // Sum total_value
 }
 