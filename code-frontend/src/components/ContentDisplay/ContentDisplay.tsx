import React, { useMemo } from "react";
import { DisplaySection } from "./ContentDisplay.style";
import { DataType } from "../../App";
import {
  formatMoney,
  getAssets,
  getGrossProfit,
  getLiabilities,
  getRevenueAndExpense,
} from "../../utils/dataFunction";
interface MyComponentProps {
  data: DataType;
}
export const ContentDisplay: React.FC<MyComponentProps> = ({ data }) => {
  const validAssetsType = ["current", "bank", "current_accounts_receivable"];
  const validLiabilitiesType = ["current", "current_accounts_payable"];
  const revenue = useMemo(() => {
    return getRevenueAndExpense(data, "revenue");
  }, [data]);
  const expense = useMemo(() => {
    return getRevenueAndExpense(data, "expense");
  }, [data]);

  const assets =
    getAssets(data, "debit", validAssetsType) -
    getAssets(data, "credit", validAssetsType);

  const liabilities =
    getLiabilities(data, "credit", validLiabilitiesType) -
    getLiabilities(data, "debit", validLiabilitiesType);

  return (
    <DisplaySection>
      <h2>Result:</h2>
      <div>Revenue:{formatMoney(revenue)}</div>
      <div>Expenses:{formatMoney(expense)}</div>
      <div>
        Gross Profit Margin:
        {((getGrossProfit(data) * 100) / revenue).toFixed(0)}%
      </div>
      <div>
        Net Profit Margin:{(((revenue - expense) * 100) / revenue).toFixed(0)}%
      </div>
      <div>
        Working Capital Ratio:{((assets * 100) / liabilities).toFixed(0)}%
      </div>
    </DisplaySection>
  );
};
