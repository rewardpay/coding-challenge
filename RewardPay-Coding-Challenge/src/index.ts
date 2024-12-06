import jsonfile from "jsonfile";
import {revenueCalculation, expensesCalculation, grossProfitMarginCalculation, netProfitMarginCalculation} from "./calculations"

// Path for the data file
const filePath = "./data/data.json";

// Synchronous reading raw data from the json file, avoiding undefined
const jsonData = jsonfile.readFileSync(filePath);

// Fetching the 'data' section from the raw data
const data = jsonData.data;

// Calculating the revenue
const revenue = revenueCalculation(data);
console.log(revenue);

// Calculating the expenses
const expenses = expensesCalculation(data);
console.log(expenses);

// Calculating the gross profit margin
const grossProfitMargin = grossProfitMarginCalculation(data, revenue);
console.log(grossProfitMargin);

// Calculating the net profit margin
const netProfitMargin = netProfitMarginCalculation(expenses, revenue);
console.log(netProfitMargin);



