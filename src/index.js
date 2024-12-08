import { parseData, calculateRevenue } from "./calculations.js";
import { formatCurrency } from "./utils.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, "../data.json");

function main() {
  const data = parseData(dataFilePath);

  const revenue = calculateRevenue(data, "revenue");
  console.log(`Revenue: ${formatCurrency(revenue)}`);
}

main();
