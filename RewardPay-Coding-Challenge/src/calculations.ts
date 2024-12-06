import { RevenueRecord } from "../types/RevenueRecord";
import { ExpensesRecord } from "../types/ExpensesRecord";

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

  