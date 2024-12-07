import { formatCurrency } from "../util/Formater.js";

import { ReadDataFile } from "../util/ReadDataFile.js";

// Define the Expenses function which calculates the total expenses
export const Expenses = (callback) => {
  const filePath = "src/data/data.json";

  // Call ReadDataFile to read the file asynchronously
  ReadDataFile(filePath, (err, data) => {
    if (err) {
      // If there was an error reading the file, log the error and pass it to the callback
      console.error("Error reading file:", err);
      callback(err, null); // Pass the error to the callback
      return;
    }

    // Filter the data to include only items where the account_category is "expense"
    const expenses = data
      .filter((item) => item.account_category === "expense")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Format the total expenses value using the formatCurrency function and pass the result to the callback
    return callback(null, formatCurrency(expenses));
  });
};
