import fs from 'fs';

export function parseData(filePath: string): any[] {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    try {
        const parsedData = JSON.parse(rawData);
        return parsedData.data || []; 
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
    }
}

export function formatCurrency(currency: number): string {
    return `$${currency.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
}
