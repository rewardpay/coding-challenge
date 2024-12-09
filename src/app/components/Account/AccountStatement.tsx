import React from "react";
import accountMovements from "../../rp-data/rp-data.json";
import { formatDate } from "@/app/utils/formatDate";
import styles from "./AccountStatement.module.css";
import { AccountData } from "@/app/types/types";
import { AccountCategory, AccountType, ValueType } from "@/app/types/enums";
import {
  expense,
  grossProfitMargin,
  netProfitMargin,
  revenue,
  workingCapitalRatio,
} from "@/app/utils/accountingFunctions";
import Statement from "./Statement";

const AccountStatement = () => {
  const statementDate = accountMovements.balance_date;
  const movements = accountMovements.data;
  const parsedMovements: AccountData[] = movements.map((movement) => {
    return {
      ...movement,
      account_category: movement.account_category as AccountCategory,
      value_type: movement.value_type as ValueType,
      account_type: movement.account_type as AccountType,
    };
  });
  const formattedDate = formatDate(statementDate);
  const totalRevenue = revenue(parsedMovements);
  const totalExpense = expense(parsedMovements);
  const grossPM = grossProfitMargin(parsedMovements);
  const netPM = netProfitMargin(parsedMovements);
  const workingCR = workingCapitalRatio(parsedMovements);
  return (
    <div className={`${styles.accountStatement} card w-100 m-4 px-4 py-2 my-6`}>
      <div>
        <h3>
          Account Statement{" "}
          {formattedDate === "NaN/NaN/NaN" ? "" : `as of  ${formattedDate}`}
        </h3>
      </div>
      <div>
        <Statement
          revenue={totalRevenue}
          expense={totalExpense}
          grossProfitMargin={grossPM}
          netProfitMargin={netPM}
          workingCapitalRatio={workingCR}
        />
      </div>
    </div>
  );
};

export default AccountStatement;
