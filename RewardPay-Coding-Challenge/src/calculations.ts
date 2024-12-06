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


// Calculation of the working capital ratio 
export const workingCapitalRatioCalculation = (
    data: WorkingCapitalRatioRecord[]
): number => {

    // Calculating the assets 
    const assets = data
    .filter(
      (record) =>
        record.account_category === "assets" &&
        ["current", "bank", "current_accounts_receivable"].includes(
          record.account_type
        )
    )
    .reduce((acc, record) => {
      return record.value_type === "debit" ? acc + record.total_value: acc - record.total_value;
    }, 0);

    // Calculating the liabilities
    const liabilities = data
    .filter(
      (record) =>
        record.account_category === "liability" &&
        ["current", "current_accounts_payable"].includes(record.account_type)
    )
    .reduce((acc, record) => {
      return record.value_type === "credit" ? acc + record.total_value : acc - record.total_value;
    }, 0);

    if(liabilities <= 0) {
        throw new Error("Working Capital Ratio cannot be calculated with a liability which is smaller or equal to 0 !!");
    }
        
    return assets / liabilities;

}
