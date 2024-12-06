import { Expenses } from "./metrics/Expenses.js";
import { GrossProfitMargin } from "./metrics/GrossProfitMargin.js";
import { NetProfitMargin } from "./metrics/NetProfitMargin.js";
import { Revenue } from "./metrics/Revenue.js";
import { WorkingCapitalRatio } from "./metrics/WorkingCapitalRatio.js";

Revenue((err, revenue) => {
  if (err) {
    console.error("Error calculating revenue:", err);
  } else {
    console.log("Total Revenue:", revenue);
  }
});
Expenses((err, expenses) => {
  if (err) {
    console.error("Error calculating expenses:", err);
  } else {
    console.log("Total Expenses:", expenses);
  }
});
GrossProfitMargin((err, grossprofitmargin) => {
  if (err) {
    console.error("Error calculating Gross Profit Margin:", err);
  } else {
    console.log("Gross Profit Margin:", grossprofitmargin);
  }
});
NetProfitMargin((err, netprofitmargin) => {
  if (err) {
    console.error("Error calculating Net Profit Margin:", err);
  } else {
    console.log("Net Profit Margin:", netprofitmargin);
  }
});
WorkingCapitalRatio((err, workingcapitalratio) => {
  if (err) {
    console.error("Error calculating Working Capital Ratio", err);
  } else {
    console.log("Working Capital Ratio:", workingcapitalratio);
  }
});
