import jsonfile from "jsonfile";
import {revenueCalculation, expensesCalculation, grossProfitMarginCalculation, netProfitMarginCalculation, workingCapitalRatioCalculation} from "./calculations"
import { dollarFormatting, percentageFormatting } from "../utils/formatUtils";

// Path for the data file
const filePath = "./data/data.json";

// Synchronous reading raw data from the json file, avoiding undefined
const jsonData = jsonfile.readFileSync(filePath);

// Fetching the 'data' section from the raw data
const data = jsonData.data;

// Calculating the revenue
const revenue = revenueCalculation(data);

// Calculating the expenses
const expenses = expensesCalculation(data);

// Calculating the gross profit margin
const grossProfitMargin = grossProfitMarginCalculation(data, revenue);

// Calculating the net profit margin
const netProfitMargin = netProfitMarginCalculation(expenses, revenue);

// Calculating the working capital ratio
const workingCapitalRatio = workingCapitalRatioCalculation(data);


console.log(`Revenue: ${dollarFormatting(revenue)}`);
console.log(`Expenses: ${dollarFormatting(expenses)}`);
console.log(`Gross Profit Margin: ${percentageFormatting(grossProfitMargin)}`)
console.log(`Net Profit Margin: ${percentageFormatting(netProfitMargin)}`)
console.log(`Working Capital Ratio: ${percentageFormatting(workingCapitalRatio)}`)



