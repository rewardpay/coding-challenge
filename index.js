const fs = require('fs');

function main() {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

}

main();
