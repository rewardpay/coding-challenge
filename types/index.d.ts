import { DataItem } from './index.d';
/** 
 * Account categories 
 * @type AccountCategory
 * @property {string} revenue - Revenue
 * @property {string} expense - Expense
 * @property {string} assets - Assets
 * @property {string} liability - Liability
 *  */
export type AccountCategory = 'revenue' | 'expense' | 'assets' | 'liability' | string;

/** 
 * Account types 
 * @type AccountType
 * @property {string} sales - Sales
 * @property {string} overheads - Over heads
 * @property {string} bank - Bank
 * @property {string} current - Current
 * @property {string} current_accounts_receivable - Current accounts receivable
 * @property {string} current_accounts_payable - Current accounts payable
 * @property {string} fixed - Fixed
 * @property {string} tax - Tax
 * @property {string} payroll - Payroll
 * */
export type AccountType = 'sales' | 'overheads' | 'bank' | 'current' | 'current_accounts_receivable' |
  'current_accounts_payable' | 'fixed' | 'tax' | 'payroll' | string;

/** 
 * Value entry type 
 * @type ValueType
 * @property {string} debit - Debit
 * @property {string} credit - Credit
 * */
export type ValueType = 'debit' | 'credit' | string;

/**
 *  Single financial account record 
 *  @interface DataItem
 *  @property {AccountCategory} account_category - Account category
 *  @property {AccountType} account_type - Account type
 *  @property {ValueType} value_type - Value entry type
 *  @property {number} total_value - Total value
 *  @property {string} account_code - Account code
 *  @property {string} account_currency - Account currency
 *  @property {string} account_identifier - Account identifier
 *  @property {string} account_name - Account name
 *  @property {string} account_status - Account status
 *  @property {string} account_type_bank - Account type bank
 *  @property {string} system_account - System account
 */
export interface DataItem {
  account_category: AccountCategory;
  account_type: AccountType;
  value_type: ValueType;
  total_value: number;
  account_code: string;
  account_currency: string;
  account_identifier: string;
  account_name: string;
  account_status: string;
  account_type_bank: string;
  system_account: string;
}
