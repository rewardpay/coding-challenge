//revenue calculation formatted
export function Revenue(data:any) {
    const items = data.filter((item:any) => item.account_category == "revenue");
    const sum = items.reduce((accumulator: number, currentItem: any) => 
        accumulator + (typeof currentItem.total_value === 'number' ? currentItem.total_value : 0), 0);
    
    return Math.trunc(sum);
}

// expenses calculation formatted
export function Expenses(data:any){
    const items = data.filter((item:any) => item.account_category == "expense");
    const sum = items.reduce((accumulator: number, currentItem: any) => 
        accumulator + (typeof currentItem.total_value === 'number' ? currentItem.total_value : 0), 0);

    return Math.trunc(sum);
}

// Gross profit Margin calculation 1 decimal digit
export function GrossProfit(data:any,revenue:number):String{
    const items = data.filter((item:any) => 
        item.account_type == "sales" && item.value_type == "debit");
    const sum = items.reduce((accumulator: number, currentItem: any) => 
        accumulator + (typeof currentItem.total_value === 'number' ? currentItem.total_value : 0), 0);
    
    return ((sum/revenue)*100).toFixed(1);
    
    
}

//Net Profit Margin calculation 1 decimal digit
export function NetProfitMargin(revenue:number,expense:number):String{
    return (((revenue - expense) / revenue) * 100).toFixed(1);
}

//Working Capital Ratio 1 decimal digit
export function WorkingCapitalRatio(data:any):String{
    //Assets calculation
    const assetDebit = data.filter((item:any) => 
        item.account_category == "assets" && item.value_type == "debit" &&
        ["current", "bank", "current_accounts_receivable"].includes(item.account_type));
    const totalAssetDebit = assetDebit.reduce((accumulator: number, item: any) => 
            accumulator + (typeof item.total_value === 'number' ? item.total_value : 0), 0);
    
    const assetCredit = data.filter((item:any) => 
        item.account_category == "assets" && item.value_type == "credit" &&
        ["current", "bank", "current_accounts_receivable"].includes(item.account_type));
    const totalAssetCredit = assetCredit.reduce((accumulator: number, item: any) => 
            accumulator + (typeof item.total_value === 'number' ? item.total_value : 0), 0);
    const totalAssets = totalAssetDebit - totalAssetCredit;
    
    
    //Liabilities calculation
    const liabilityCredit = data.filter((item:any) => 
        item.account_category == "liability" && item.value_type == "credit" &&
        ["current", "current_accounts_payable"].includes(item.account_type));
    const totalLiabilityCrebit = liabilityCredit.reduce((accumulator: number, item: any) => 
        accumulator + (typeof item.total_value === 'number' ? item.total_value : 0), 0);

    const liabilityDebit = data.filter((item:any) => 
        item.account_category == "liability" && item.value_type == "debit" &&
        ["current", "current_accounts_payable"].includes(item.account_type));
    const totalLiabilityDebit = liabilityDebit.reduce((accumulator: number, item: any) => 
        accumulator + (typeof item.total_value === 'number' ? item.total_value : 0), 0);

    const totalLiabilities = totalLiabilityCrebit - totalLiabilityDebit;

    return ((totalAssets / totalLiabilities)*100).toFixed(1);

}   