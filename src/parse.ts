import fs from 'fs';

export function ReadData(filePath:string) {
    const file = fs.readFileSync('./data.json', 'utf-8');

    try {
        const parsedData = JSON.parse(file);
        return  parsedData.data || []; 
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
    }
}
