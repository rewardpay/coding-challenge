import { AccountCategory, AccountType, ValueType } from "./enums";

export type AccountData = {
  account_category: AccountCategory;
  account_code: string; // All account codes are strings
  account_currency: string; // All accounts use AUD as the currency ==> string
  account_identifier: string; // UUID format
  account_status: string; // Status is always ACTIVE
  value_type: ValueType; // Credit or debit values
  account_name: string; // Name of the account
  account_type: AccountType; 
  account_type_bank?: string; // Empty string or specific bank information
  system_account?: string; // Empty string or specific system account like "DEBTORS", "CREDITORS"
  total_value: number; // Represents monetary values
};
