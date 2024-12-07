// Import necessary functions for calculating the different financial metrics
import { Expenses } from "./metrics/Expenses.js"; // Import Expenses function
import { GrossProfitMargin } from "./metrics/GrossProfitMargin.js"; // Import GrossProfitMargin function
import { NetProfitMargin } from "./metrics/NetProfitMargin.js"; // Import NetProfitMargin function
import { Revenue } from "./metrics/Revenue.js"; // Import Revenue function
import { WorkingCapitalRatio } from "./metrics/WorkingCapitalRatio.js"; // Import WorkingCapitalRatio function

// Calculate Total Revenue
Revenue((err, revenue) => {
  if (err) {
    // If there's an error calculating revenue, log the error
    console.error("Error calculating revenue:", err);
  } else {
    // If successful, log the formatted total revenue
    console.log("Total Revenue:", revenue);
  }
});

// Calculate Total Expenses
Expenses((err, expenses) => {
  if (err) {
    // If there's an error calculating expenses, log the error
    console.error("Error calculating expenses:", err);
  } else {
    // If successful, log the formatted total expenses
    console.log("Total Expenses:", expenses);
  }
});

// Calculate Gross Profit Margin
GrossProfitMargin((err, grossprofitmargin) => {
  if (err) {
    // If there's an error calculating gross profit margin, log the error
    console.error("Error calculating Gross Profit Margin:", err);
  } else {
    // If successful, log the formatted gross profit margin
    console.log("Gross Profit Margin:", grossprofitmargin);
  }
});

// Calculate Net Profit Margin
NetProfitMargin((err, netprofitmargin) => {
  if (err) {
    // If there's an error calculating net profit margin, log the error
    console.error("Error calculating Net Profit Margin:", err);
  } else {
    // If successful, log the formatted net profit margin
    console.log("Net Profit Margin:", netprofitmargin);
  }
});

// Calculate Working Capital Ratio
WorkingCapitalRatio((err, workingcapitalratio) => {
  if (err) {
    // If there's an error calculating working capital ratio, log the error
    console.error("Error calculating Working Capital Ratio", err);
  } else {
    // If successful, log the formatted working capital ratio
    console.log("Working Capital Ratio:", workingcapitalratio);
  }
});
