import { Expenses } from "./metrics/Expenses.js";
import { GrossProfitMargin } from "./metrics/GrossProfitMargin.js";
import { Revenue } from "./metrics/Revenue.js";

Revenue((err, revenue) => {
  if (err) {
    console.error("Error calculating revenue:", err);
  } else {
    console.log("Total Revenue:", revenue);
  }
});
Expenses((err, expenses) => {
  if (err) {
    console.error("Error calculating revenue:", err);
  } else {
    console.log("Total Expenses:", expenses);
  }
});
GrossProfitMargin((err, grossprofitmargin) => {
  if (err) {
    console.error("Error calculating revenue:", err);
  } else {
    console.log("Gross Profit Margin:", grossprofitmargin);
  }
});
