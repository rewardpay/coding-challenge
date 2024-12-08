"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFinancialData = readFinancialData;
const fs_1 = __importDefault(require("fs"));
// Function to extract JSON file
function readFinancialData(filePath) {
    try {
        const rawData = fs_1.default.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData); //read and parse the json 
    }
    catch (error) {
        console.log("error reading file data.json", error); //validating error 
        return { data: [] };
    }
}
//const data = readFinancialData('./data.json') 
//console.log(data) //to check payload
