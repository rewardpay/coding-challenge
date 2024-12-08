import React from "react";
import AccountStatement from "./AccountStatement";
import AccountMovements from "./AccountMovements";

const AccountInfo = () => {
  return (
    <div
      className="d-flex flex-row justify-content-between py-5"
      style={{ backgroundColor: "var(--rp-grey)", height: "100%", color: "var(--rp-dark-blue)" }}
    >
      <AccountStatement />
      <AccountMovements />
    </div>
  );
};

export default AccountInfo;
