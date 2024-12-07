interface Account {
    account_category: string;
    value_type?: string;
    account_type?: string;
    total_value: number;
};
export const calculations=(accounts:Account[])=>{
//Calculate revenue
const revenue =accounts.filter(a=>a.account_category==="revenue")
                       .reduce((sum,a)=> sum+a.total_value,0)
//Calculate expenses
const expenses=accounts.filter(a => a.account_category==="expense")
                       .reduce ((sum,a)=>sum+a.total_value,0)
//Calculate Gross Profit Margin
const grossProfitMargin = (()=>{
    const debit=accounts.filter(a=>a.account_type==="sales" && 
                                a.value_type==="debit")
                        .reduce((sum, a)=> sum+a.total_value, 0)
    return (debit/revenue)*100
})()
//Calculate Net Profit Margin
const netProfitMargin=((revenue-expenses)/revenue)*100
//Calculate Working Capital Ratio
const workingCapitalRatio = (() => {
    const assets = accounts
        .filter(
            a =>a.account_category === "assets" &&
                ["current", "bank", "current_accounts_receivable"]
                .includes(a.account_type || ""))
        .reduce(
            (sum, a) => (a.value_type === "debit" ? sum + a.total_value : sum - a.total_value), 0
        );

    const liabilities = accounts
        .filter(
            a =>a.account_category === "liability" &&
                ["current", "current_accounts_payable"]
                .includes(a.account_type || ""))
        .reduce(
            (sum, a) => (a.value_type === "credit" ? sum + a.total_value : sum - a.total_value),0
        );

    return (assets / liabilities) * 100;
})();
//Rerutn calculation results
 return { revenue, expenses, grossProfitMargin, netProfitMargin, workingCapitalRatio }
}