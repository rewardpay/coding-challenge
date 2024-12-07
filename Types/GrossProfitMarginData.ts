// Define the GrossProfitMarginDataType for the application's data structure
export type GrossProfitMarginDataType = {
    account_category: string;
    value_type:'debit'| 'credit';
    total_value: number;
    account_type: 'sales' | 'overheads' | 'current_accounts_receivable' | 'bank' | 'fixed' | 'current_accounts_payable' |'tax' | 'current';
}