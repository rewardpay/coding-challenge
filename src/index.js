import { Expenses } from "./metrics/Expenses.js";
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
