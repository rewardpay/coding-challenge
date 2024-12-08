import { readFinancialData } from "./index";

const mockData = {
    data: [
        { account_category: 'revenue', total_value: 100 },
        { account_category: 'revenue', total_value: 200 },
        { account_category: 'expense', total_value: 50 },
    ]
}
// Mock readFinancData
jest.mock('./index',()=>({
    readFinancialData:jest.fn(()=>mockData)
}))

//test for revenue
test('calculate revenue correctly',()=>{
    const data = mockData.data
    const revenue = data.filter(entry=>entry.account_category==="revenue")
                        .reduce((sum,entry)=>sum+entry.total_value,0)
                        expect(revenue).toBe(300)
})

//test for expenses
test('calculate expenses correctly',()=>{
    const data = mockData.data;
    const expenses = data.filter(entry=>entry.account_category==="expense")
                         .reduce((sum,entry)=>sum+entry.total_value,0)
                expect(expenses).toBe(50);             
})

