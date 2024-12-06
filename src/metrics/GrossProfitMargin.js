import { formatPercentage } from "../util/Formater.js";
import { ReadDataFile } from "../util/ReadDataFile.js";

export const GrossProfitMargin = (callback) => {
  const filepath = "src/data/data.json";
  ReadDataFile(filepath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      callback(err, null);
      return;
    }

    const salesTotal = data
      .filter(
        (item) => item.account_type === "sales" && item.value_type === "debit"
      )
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const revenue = data
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const grossProfitMargin = (salesTotal / revenue) * 100;

    return callback(null, formatPercentage(grossProfitMargin));
  });
};
