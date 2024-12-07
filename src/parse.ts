import fs from 'fs';

//Read the data file 
export function readData(filePath:string) {
    const file = fs.readFileSync('./data.json', 'utf-8');

    try {
        const parsedData = JSON.parse(file);
        return  parsedData.data || []; 
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
    }
}


export function formatting(input:number){
    const formatter = new Intl.NumberFormat('en-US');

    const formattedNumber = formatter.format(input);
    return formattedNumber;

}