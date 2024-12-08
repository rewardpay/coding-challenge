import fs from 'fs';
import { Account } from '../types/account';

export function parseAccountData(filePath: string): Account[] {
    // TODO: add support for Batch loading for large files
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return jsonData.data as Account[];
}