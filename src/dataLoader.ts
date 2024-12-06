import fs from 'fs';

export const readData = (filePath: string) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
