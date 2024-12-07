// Define the WorkingCapitalRatioDataType for the application's data structure
export type WorkingCapitalRatioDataType = {
    account_category: 'revenue'|'expense'|'assets'|'liability';
    value_type: 'debit' | 'credit';
    account_type: 'sales' | 'overheads' | 'current_accounts_receivable' | 'bank' | 'fixed' | 'current_accounts_payable' |'tax' | 'current';
    total_value: number;


}