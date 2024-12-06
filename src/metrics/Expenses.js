import { ReadDataFile } from "../util/ReadDataFile.js";

export const Expenses = (callback) => {
  const filePath = "src/data/data.json";
  ReadDataFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      callback(err, null);
      return;
    }
    const expenses = data
      .filter((item) => item.account_category === "expense")
      .map((item) => item.total_value)
      .reduce((sum, value) => sum + value, 0);

    return callback(null, expenses);
  });
};
