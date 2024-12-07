// Revenue Calculation Fucntion
export function calculateRevenue(data: any[]): number {
    return data
        .filter(item => item.account_category === 'revenue')  // Filter for revenue
        .reduce((total, item) => total + item.total_value, 0); // Sum total_value
}