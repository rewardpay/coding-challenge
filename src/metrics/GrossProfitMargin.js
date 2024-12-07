import { formatPercentage } from "../util/Formater.js";

import { ReadDataFile } from "../util/ReadDataFile.js";

// Define the GrossProfitMargin function which calculates the gross profit margin
export const GrossProfitMargin = (callback) => {
  const filepath = "src/data/data.json";

  // Use ReadDataFile to read the JSON data asynchronously
  ReadDataFile(filepath, (err, data) => {
    if (err) {
      // If there is an error reading the file, log it and pass the error to the callback
      console.error("Error reading file:", err);
      callback(err, null); // Pass the error to the callback
      return;
    }

    // Calculate the total sales by filtering for items where account_type is "sales" and value_type is "debit"
    const salesTotal = data
      .filter(
        (item) => item.account_type === "sales" && item.value_type === "debit"
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the total revenue by filtering for items where account_category is "revenue"
    const revenue = data
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the gross profit margin using the formula: (salesTotal / revenue) * 100
    const grossProfitMargin = (salesTotal / revenue) * 100;

    // Format the gross profit margin using formatPercentage and return the result via callback
    return callback(null, formatPercentage(grossProfitMargin));
  });
};
