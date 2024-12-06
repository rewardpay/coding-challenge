const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
console.log("data",data);