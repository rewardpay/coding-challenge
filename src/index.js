const { parseData, calculateRevenue } = require("./calculations.js");

const path = require("path");

const dataFilePath = path.join(__dirname, "../data.json");

function main() {
  const data = parseData(dataFilePath);

  const revenue = calculateRevenue(data, "revenue");
  console.log(revenue);
}

main();
