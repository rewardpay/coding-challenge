import { RevenueRecord } from "../types/RevenueRecord";

// Calculation of the revenue
export const revenueCalculation = (data: RevenueRecord[]): number => {
    return data
      .filter((record) => record.account_category === "revenue")
      .reduce((acc, record) => acc + record.total_value, 0);
  };
  