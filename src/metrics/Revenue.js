import { formatCurrency } from "../util/Formater.js";
import { ReadDataFile } from "../util/ReadDataFile.js";

export const Revenue = (callback) => {
  const filePath = "src/data/data.json";
  ReadDataFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      callback(err, null);
      return;
    }
    const revenue = data
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    return callback(null, formatCurrency(revenue));
  });
};
