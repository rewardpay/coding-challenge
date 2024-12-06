import jsonfile from "jsonfile";
import {revenueCalculation} from "./calculations"

// Path for the data file
const filePath = "./data/data.json";

// Synchronous reading raw data from the json file, avoiding undefined
const jsonData = jsonfile.readFileSync(filePath);

// Fetching the 'data' section from the raw data
const data = jsonData.data;

// Calculating the revenue
const revenue = revenueCalculation(data);



