const fs = require("fs");

function parseData(filePath) {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

function calculateRevenue(dataWrapper, category) {
  return dataWrapper.data
    .filter((item) => item.account_category === category)
    .reduce((sum, item) => sum + item.total_value, 0);
}

module.exports = {
  parseData,
  calculateRevenue,
};
