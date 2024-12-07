var fs = require('fs')

// readData for reading and parsing JSON data
export function readData(filePath: string): any {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        throw error
    }
}

// formatCurrency to format currency
export function formatCurrency(value: number): string {
    return `$${Math.floor(value).toLocaleString()}`
}

// formatPercentage to format percentage
export function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
}