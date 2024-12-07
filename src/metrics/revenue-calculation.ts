import { RevenueDataType } from "../../Types/RevenueData";

// Revenue Calculation Fucntion
export function calculateRevenue(data: RevenueDataType[]): number {
    return data
        .filter(item => item.account_category === 'revenue')  // Filter for revenue
        .reduce((total, item) => total + item.total_value, 0); // Sum total_value
}