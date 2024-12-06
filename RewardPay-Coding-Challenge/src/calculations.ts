import { RevenueRecord } from "../types/RevenueRecord";
import { ExpensesRecord } from "../types/ExpensesRecord";
import { GrossProfitMarginRecord } from "../types/GrossProfitMarginRecord";
import { WorkingCapitalRatioRecord } from "../types/WorkingCapitalRatioRecord";

// Calculation of the revenue
export const revenueCalculation = (data: RevenueRecord[]): number => {
    return data
      .filter((record) => record.account_category === "revenue")
      .reduce((acc, record) => acc + record.total_value, 0);
  };


// Calculation of the expenses
export const expensesCalculation = (data: ExpensesRecord[]): number => {
    return data
        .filter((record) => record.account_category === "expense")
        .reduce((acc, record) => acc + record.total_value, 0);
}

// Calculation of the gross profit margin
export const grossProfitMarginCalculation = (
    data: GrossProfitMarginRecord[],
    revenue: number
): number => {
    if(revenue <= 0){
        throw new Error("Gross Profit Margin cannot be calculated when revenue is smaller or equal to 0 !!");
    }

    const salesDebit = data
        .filter((record) => record.account_type === "sales" && record.value_type === "debit")
        .reduce((acc, record) => acc + record.total_value, 0);

    return salesDebit/revenue;
}

// Calculation of the net profit margin
export const netProfitMarginCalculation = (
    expenses: number,
    revenue: number
): number => {
    if(revenue <= 0){
        throw new Error("Net Profit Margin cannot be calculated when revenue is smaller or equal to 0 !!")
    }

    return (revenue - expenses)/revenue;
}



  