const { parseData } = require("./calculations.js");

const path = require("path");

const dataFilePath = path.join(__dirname, "../data.json");

function main() {
  const data = parseData(dataFilePath);
  console.log(data);
}

main();
