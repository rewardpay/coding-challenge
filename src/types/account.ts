export interface Account {
    account_category: string;
    account_code: string;
    account_currency: string;
    account_identifier: string;
    account_name: string;
    account_status: string;
    account_type: string;
    account_type_bank: string;
    system_account: string;
    total_value: number;
    value_type: 'debit' | 'credit';
}