import { z } from "zod";

export enum AccountCategory {
  REVENUE = "revenue",
  EXPENSE = "expense",
  ASSETS = "assets",
  LIABILITY = "liability",
}

export enum AccountType {
  SALES = "sales",
  OVERHEADS = "overheads",
  CURRENT_ACCOUNTS_RECEIVABLE = "current_accounts_receivable",
  BANK = "bank",
  FIXED = "fixed",
  CURRENT_ACCOUNTS_PAYABLE = "current_accounts_payable",
  TAX = "tax",
  CURRENT = "current",
  PAYROLL = "payroll",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum ValueType {
  CREDIT = "credit",
  DEBIT = "debit",
}

export const ledgerDataSchema = z.object({
  account_category: z.nativeEnum(AccountCategory),
  account_code: z.string(),
  account_currency: z.string(),
  account_identifier: z.string(),
  account_status: z.nativeEnum(AccountStatus),
  value_type: z.nativeEnum(ValueType),
  account_name: z.string(),
  account_type: z.nativeEnum(AccountType),
  account_type_bank: z.string().optional(),
  system_account: z.string().optional(),
  total_value: z.number(),
});

export type LedgerData = z.infer<typeof ledgerDataSchema>;

export const srcDataSchema = z.object({
    object_category: z.string(),
    connection_id: z.string(),
    user: z.string(),
    object_creation_date: z.string(),
    data: z.array(ledgerDataSchema),
    currency: z.string(),
    object_origin_type: z.string(),
    object_origin_category: z.string(),
    object_type: z.string(),
    object_class: z.string(),
    balance_date: z.string(),
})

export type SrcData = z.infer<typeof srcDataSchema>;
