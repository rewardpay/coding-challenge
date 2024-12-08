const fs = require("fs");

function parseData(filePath) {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

module.exports = {
  parseData,
};
