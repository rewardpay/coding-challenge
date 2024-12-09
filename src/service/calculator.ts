import { Account } from "../types/account";

export class AccountingCalculator {
  private data: Account[];

  constructor(data: Account[]) {
    this.data = data;
  }
  calculateRevenue(): number {
    // calculate total revenue
    return this.data
      .filter((account) => account.account_category === "revenue")
      .reduce((sum, account) => sum + account.total_value, 0);
  }
  calculateExpenses(): number {
    // calculate expense by category 'expense
    return this.data
      .filter((account) => account.account_category === "expense")
      .reduce((sum, account) => sum + account.total_value, 0);
  }

  calculateGrossProfitMargin(): number {
    // Calculates Gross Profit Margin using  Formula: (Sales Value / Revenue) * 100
    const salesValue = this.data
      .filter(
        (account) =>
          account.account_type === "sales" && account.value_type === "debit"
      )
      .reduce((sum, account) => sum + account.total_value, 0);

    const revenue = this.calculateRevenue();
    return revenue !== 0 ? (salesValue / revenue) * 100 : 0;
  }

  calculateNetProfitMargin(): number {
    // Calculates Net Profit Margin using Formula: ((Revenue - Expenses) / Revenue) * 100
    const revenue = this.calculateRevenue();
    const expenses = this.calculateExpenses();
    return revenue !== 0 ? ((revenue - expenses) / revenue) * 100 : 0;
  }

  calculateWorkingCapitalRatio(): number {
    // Calculates Working Capital Ratio using Formula: (Current Assets / Current Liabilities) * 100
    const assets = this.calculateCurrentAssets();
    const liabilities = this.calculateCurrentLiabilities();
    return liabilities !== 0 ? (assets / liabilities) * 100 : 0;
  }
  private calculateCurrentAssets(): number {
    // calculate current assets by subtracting all credit from debit
    const validTypes = ["current", "bank", "current_accounts_receivable"];

    // Calculate total debits
    const debitAssets = this.data
      .filter(
        (account) =>
          account.account_category === "assets" &&
          account.value_type === "debit" &&
          validTypes.includes(account.account_type)
      )
      .reduce((sum, account) => sum + account.total_value, 0);

    // Calculate total credits
    const creditAssets = this.data
      .filter(
        (account) =>
          account.account_category === "assets" &&
          account.value_type === "credit" &&
          validTypes.includes(account.account_type)
      )
      .reduce((sum, account) => sum + account.total_value, 0);

    return debitAssets - creditAssets;
  }
  private calculateCurrentLiabilities(): number {
    // calculate current liabilities by subtracting all credit from debit
    const validTypes = ["current", "current_accounts_payable"];

    // Calculate total credits
    const creditLiabilities = this.data
      .filter(
        (account) =>
          account.account_category === "liability" &&
          account.value_type === "credit" &&
          validTypes.includes(account.account_type)
      )
      .reduce((sum, account) => sum + account.total_value, 0);

    // Calculate total debits
    const debitLiabilities = this.data
      .filter(
        (account) =>
          account.account_category === "liability" &&
          account.value_type === "debit" &&
          validTypes.includes(account.account_type)
      )
      .reduce((sum, account) => sum + account.total_value, 0);

    return creditLiabilities - debitLiabilities;
  }
}
