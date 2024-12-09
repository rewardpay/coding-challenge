import React from "react";
import accountMovements from "../../rp-data/rp-data.json";
import { AccountData } from "@/app/types/types";
import Movement from "./Movement";
import { AccountCategory, AccountType, ValueType } from "@/app/types/enums";
import styles from "./AccountMovements.module.css"

const AccountMovements = () => {
  const movements = accountMovements.data;

  return (
    <div
      className={`${styles.accountMovements} card w-100 m-2 p-2 my-6 gap-2`}
    >
      <h3>Account Movements:</h3>
      {movements.map((movement, index) => {
        const parsedMovement: AccountData = {
          ...movement,
          account_category: movement.account_category as AccountCategory,
          value_type: movement.value_type as ValueType,
          account_type: movement.account_type as AccountType,
        };
        return <Movement key={index} {...parsedMovement} />;
      })}
    </div>
  );
};

export default AccountMovements;
