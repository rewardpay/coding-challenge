const metrics = require("./calculateMetrics");

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const revenue = metrics.calculateRevenue(data.data);
console.log("Revenue:",revenue);


  