import { formatCurrency } from "../util/Formater.js";
import { ReadDataFile } from "../util/ReadDataFile.js";

// Define the Revenue function which calculates total revenue
export const Revenue = (callback) => {
  const filePath = "src/data/data.json";

  // Use ReadDataFile to read the data asynchronously
  ReadDataFile(filePath, (err, data) => {
    if (err) {
      // If there is an error reading the file, log the error and pass it to the callback
      console.error("Error reading file:", err);
      callback(err, null); // Pass the error to the callback
      return;
    }

    // Filter the data to include only items where the account_category is "revenue"
    // Extract the total_value for each of the filtered items and sum them up to calculate total revenue
    const revenue = data
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Format the revenue as a currency and pass the result to the callback
    return callback(null, formatCurrency(revenue));
  });
};
