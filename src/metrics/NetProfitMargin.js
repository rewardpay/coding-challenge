import { ReadDataFile } from "../util/ReadDataFile.js";

export const NetProfitMargin = (callback) => {
  const filepath = "src/data/data.json";

  ReadDataFile(filepath, (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      callback(err, null);
      return;
    }
    const revenue = data
      .filter((item) => item.account_category === "revenue")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const expenses = data
      .filter((item) => item.account_category === "expenses")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    const netProfitMargin = ((revenue - expenses) / revenue) * 100;
    callback(null, netProfitMargin);
  });
};
