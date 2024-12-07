import { Account } from "./types";

//get Revenue
export const getRevenue = (accounts: Account[]): number => accounts
        .filter((account) => account.account_category === "revenue")
        .reduce((acc, cur) => acc + cur.total_value, 0);

//get Expenses
export const getExpense = (accounts: Account[]): number => accounts
        .filter(account => account.account_category === "expense")
        .reduce((acc, cur) => acc + cur.total_value, 0);

//get Gross Profit Margin
export const getGrossProfitMargin = (accounts: Account[], revenue: number): number => {
    if (revenue === 0) {
        throw new Error ("Revenue can't be 0.");
    }

    const profit = accounts
        .filter(account => account.account_type === "sales" && account.value_type === "debit")
        .reduce((acc, cur) => acc + cur.total_value, 0);
    
    return profit / revenue;
};

//get Net Profit Margin
export const getNetProfitMargin = (revenue: number, expenses: number) => {
    if (revenue === 0) {
        throw new Error ("Revenue can't be 0.");
    }

    return (revenue - expenses) / revenue;
};

//get Working Capital Ratio
export const getWorkingCapitalRatio = (accounts: Account[]): number => {
    const assetsData = accounts.filter(account => account.account_category === "assets");
    const assetsDebit = assetsData
        .filter(account => 
            account.value_type === "debit" 
            && ["current", "bank", "current_accounts_receivable"].includes(account.account_type)
        )
        .reduce((acc, cur) => acc + cur.total_value, 0);
    const assetsCredit = assetsData
        .filter(account => 
            account.value_type === "credit"
            && ["current", "bank", "current_accounts_receivable"].includes(account.account_type)
        )
        .reduce((acc, cur) => acc + cur.total_value, 0);
    
    const liabilitiesData = accounts.filter(account => account.account_category === "liability");
    const liabilitiesDebit = liabilitiesData
        .filter(account => 
            account.value_type === "debit"
            && ["current", "current_accounts_payable"].includes(account.account_type)
        )
        .reduce((acc, cur) => acc + cur.total_value, 0);

    const liabilitiesCredit = accounts
        .filter(account => 
            account.value_type === "credit"
            && ["current", "current_accounts_payable"].includes(account.account_type)
        )
        .reduce((acc, cur) => acc + cur.total_value, 0);
    
    const assets = assetsDebit - assetsCredit;
    const liabilities = liabilitiesCredit - liabilitiesDebit;

    const workingCapitalRatio = liabilities === 0 ? Infinity : assets / liabilities;
    
    return workingCapitalRatio;
};