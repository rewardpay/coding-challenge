import { formatPercentage } from "../util/Formater.js";

import { ReadDataFile } from "../util/ReadDataFile.js";

// Define the WorkingCapitalRatio function which calculates the working capital ratio
export const WorkingCapitalRatio = (callback) => {
  const filepath = "src/data/data.json";
  // Use ReadDataFile to read the data asynchronously
  ReadDataFile(filepath, (err, data) => {
    if (err) {
      // If there is an error reading the file, log the error and pass it to the callback
      console.log("Error reading file:", err);
      callback(err, null); // Pass the error to the callback
      return;
    }

    // Calculate the total debit assets
    const debitAssets = data
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "debit" && // Filter for "debit" type value
          (item.account_type === "current" ||
            item.account_type === "bank" ||
            item.account_type === "current_accounts_receivable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the total credit assets
    const creditAssets = data
      .filter(
        (item) =>
          item.account_category === "assets" &&
          item.value_type === "credit" && // Filter for "credit" type value
          (item.account_type === "current" ||
            item.account_type === "bank" ||
            item.account_type === "current_accounts_receivable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const assets = debitAssets - creditAssets; // Calculate net assets by subtracting credit assets from debit assets

    // Calculate the total debit liabilities
    const debitLiabilities = data
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "debit" && // Filter for "debit" type value
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the total credit liabilities
    const creditLiabilities = data
      .filter(
        (item) =>
          item.account_category === "liability" &&
          item.value_type === "credit" && // Filter for "credit" type value
          (item.account_type === "current" ||
            item.account_type === "current_accounts_payable")
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const liabilities = creditLiabilities - debitLiabilities; // Calculate net liabilities by subtracting debit liabilities from credit liabilities

    // Calculate the working capital ratio using the formula: (assets / liabilities) * 100
    const workingcapitalratio = (assets / liabilities) * 100;

    // Format the working capital ratio as a percentage and pass the result to the callback
    callback(null, formatPercentage(workingcapitalratio));
  });
};
