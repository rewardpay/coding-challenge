import fs from 'fs';

//Structure of each data entry
interface DataStructure {
  account_category: string;
  account_type: string;
  value_type: string;
  total_value: number;
}
//for accesing array in the object 
interface RootObject{
    data:DataStructure[]
}


// Function to extract JSON file
export function readFinancialData(filePath:string):RootObject{
    try{
        const rawData = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(rawData) as RootObject //read and parse the json 

    }catch(error){
        console.log("error reading file data.json",error) //validating error 
        return {data:[]}
    }
}


//const data = readFinancialData('./data.json') 
//console.log(data) //to check payload


