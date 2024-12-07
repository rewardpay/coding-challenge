import * as fs from 'fs';

export const readJsonFile = (filePath: string): any => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading or parsing the file: ${filePath}`);
  }
};

export function formatCurrency (value: number) {
    return `$${value.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`;
};

export function formatValue (value: number) {
    return `${(value * 100).toFixed(1)}%`;
};