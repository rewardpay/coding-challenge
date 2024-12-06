import { ReadDataFile } from "../util/ReadDataFile.js";

export const WorkingCapitalRatio = (callback) => {
  const filepath = "src/data/data.json";
  ReadDataFile(filepath, (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      callback(err, null);
      return;
    }
    const debitAssets = data
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "debit" &&
          (item.account_type === "current" ||
            item.account_type === "bank" ||
            item.account_type === "current_accounts_receivable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);
    const creditAssets = data
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "credit" &&
          (item.account_type === "current" ||
            item.account_type === "bank" ||
            item.account_type === "current_accounts_receivable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);
    const assets = debitAssets - creditAssets;

    const debitLiabilities = data
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "debit" &&
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);
    const creditLiabilities = data
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "credit" &&
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const liabilities = creditLiabilities - debitLiabilities;
    const workingcapitalratio = (assets / liabilities) * 100;
    callback(null, workingcapitalratio);
  });
};
