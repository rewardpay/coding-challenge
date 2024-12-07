import { formatPercentage } from "../util/Formater.js";
import { ReadDataFile } from "../util/ReadDataFile.js";

// Define the NetProfitMargin function which calculates the net profit margin
export const NetProfitMargin = (callback) => {
  const filepath = "src/data/data.json"; // Define the path to the data file

  // Use ReadDataFile to read the data from the file asynchronously
  ReadDataFile(filepath, (err, data) => {
    if (err) {
      // If there was an error reading the file, log the error and pass it to the callback
      console.log("Error reading file:", err);
      callback(err, null); // Pass the error to the callback
      return;
    }

    // Calculate the total revenue by summing up total_value where account_category is "revenue"
    const revenue = data
      .filter((item) => item.account_category === "revenue") // Filter for revenue items
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the total expenses by summing up total_value where account_category is "expenses"
    const expenses = data
      .filter((item) => item.account_category === "expenses")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    // Calculate the net profit margin using the formula: ((revenue - expenses) / revenue) * 100
    const netProfitMargin = ((revenue - expenses) / revenue) * 100;

    // Format the net profit margin as a percentage and pass it to the callback
    callback(null, formatPercentage(netProfitMargin)); // Pass the result to the callback with no error
  });
};
