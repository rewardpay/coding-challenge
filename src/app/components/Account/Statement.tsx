import { StatementType } from "@/app/types/types";
import { formatCurrency, parsePercentage } from "@/app/utils/parsingNumbers";
import React from "react";
import styles from "./Statement.module.css"

const Statement = ({
  revenue,
  expense,
  grossProfitMargin,
  netProfitMargin,
  workingCapitalRatio,
}: StatementType) => {
  return (
    <div className={`${styles.kpi}`}>
      <div className="d-flex flex-row justify-content-between">
        <p>Revenue: </p>
        <p>{formatCurrency(revenue)}</p>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Expense: </p>
        <p>{formatCurrency(expense)}</p>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Gross Profit Margin: </p>
        <p>{parsePercentage(grossProfitMargin)}</p>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Net Profit Margin: </p>
        <p>{parsePercentage(netProfitMargin)}</p>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Working Capital Ratio: </p>
        <p>{parsePercentage(workingCapitalRatio)}</p>
      </div>
    </div>
  );
};

export default Statement;
