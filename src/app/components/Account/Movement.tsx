import { AccountData } from "@/app/types/types";
import React from "react";
import styles from "./Movement.module.css"
import { formatCurrency } from "@/app/utils/parsingNumbers";

const Movement = ({ ...parsedMovement }: AccountData) => {

  return (
    <div className={`${styles.movement} card w-100`}>
      <div className="d-flex flex-row justify-content-between">
        <p>Account Category: </p>
        <p>{parsedMovement.account_category}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Account Code: </p>
        <p>{parsedMovement.account_code}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Currency: </p>
        <p>{parsedMovement.account_currency}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Identifier: </p>
        <p>{parsedMovement.account_identifier}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Status: </p>
        <p>{parsedMovement.account_status}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Type: </p>
        <p>{parsedMovement.value_type}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Account Name: </p>
        <p>{parsedMovement.account_name}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Account Type: </p>
        <p>{parsedMovement.account_type}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Account Type Bank: </p>
        <p>{parsedMovement.account_type_bank ? parsedMovement.account_type_bank : "-"}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>System Account: </p>
        <p>{parsedMovement.system_account ? parsedMovement.system_account : "-"}</p>
        </div>
      <div className="d-flex flex-row justify-content-between">
        <p>Total Value: </p>
        <p>{formatCurrency(parsedMovement.total_value)}</p>
        </div>
    </div>
  );
};

export default Movement;
