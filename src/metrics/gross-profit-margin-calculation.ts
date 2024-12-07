// Gross Profit Margin Calculation Function
export function calculateGrossProfitMargin(data: any[], revenue: number): number {
    // Step 1: Added the total_value for all 'sales' with 'debit' value_type
    const totalSales = data
        .filter(item => item.account_type === 'sales' && item.value_type === 'debit') // it filters sales with debit
        .reduce((sum, item) => sum + item.total_value, 0); // adding the total_value fields

    // Step 2: Calculated the Gross Profit Margin as a percentage
    if (revenue === 0) {
        throw new Error("Revenue cannot be zero when calculating Gross Profit Margin.");
    }

    const grossProfitMargin = (totalSales / revenue) * 100; // Divide by revenue and convert to percentage
    return grossProfitMargin;
}

 