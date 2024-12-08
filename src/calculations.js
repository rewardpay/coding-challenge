import fs from "fs";

export function parseData(filePath) {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

export function calculateRevenue(dataWrapper, category) {
  return dataWrapper.data
    .filter((item) => item.account_category === category)
    .reduce((sum, item) => sum + item.total_value, 0);
}
