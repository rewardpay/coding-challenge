"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const rawData = (0, index_1.readFinancialData)('./data.json');
const data = rawData.data; //extracting array
//1.Calculating Revenue 
const revenue = data.filter(entry => entry.account_category === "revenue") //filtering revenue
    .reduce((sum, entry) => sum + entry.total_value, 0); //suming revenue with reduce method
console.log(`Revenue: $${revenue.toLocaleString('en-US')}`);
//calculating expense
const expense = data.filter(entry => entry.account_category === "expense") //filtering expense
    .reduce((sums, entry) => sums + entry.total_value, 0); //suming expense
const formatedExpense = `$${expense.toLocaleString('en-US', { maximumFractionDigits: 0 })}`; //removing cents         
console.log(`Expense: ${formatedExpense}`);
//calculating  gross Profit Margin
const grossProfit = data.filter(entry => entry.account_type === "sales" && entry.value_type === "debit") //filtering
    .reduce((sum, entry) => sum + entry.total_value, 0);
//calculating gross margin by percentage
const grossProfitMargin = (grossProfit / revenue) * 100;
console.log(`Gross Profit Margin: ${grossProfitMargin.toFixed(1)}%`);
//calculating Net Profit Margin
const netProfitMargin = ((revenue - expense) / revenue) * 100;
console.log(`Net Profit Margin: ${netProfitMargin.toFixed(1)}%`);
//calculating  working capital ratio
//calculating assets
const assets = data.filter(entry => entry.account_category === "assets" && ["current", "bank", "current_accounts_receivable"].includes(entry.account_type))
    .reduce((sum, entry) => {
    if (entry.value_type === "debit") {
        sum += entry.total_value;
    }
    else {
        sum -= entry.total_value;
    }
    return sum;
}, 0);
//calculating liabilities 
const liabilities = data.filter(entry => entry.account_category === "liability" && ["current", "current_accounts_payable"].includes(entry.account_type))
    .reduce((sum, entry) => {
    if (entry.value_type === "credit") {
        sum += entry.total_value;
    }
    else {
        sum -= entry.total_value;
    }
    return sum;
}, 0);
//calculating working ratio capital
let capitalWorking = 0;
if (liabilities != 0) {
    capitalWorking = (assets / liabilities) * 100;
}
else {
    console.log("Liabilities are zero, cannot calculate working ratio");
    capitalWorking = 0; //handling handle zero
}
console.log(`working capital ratio :${capitalWorking.toFixed(1)}%`);
