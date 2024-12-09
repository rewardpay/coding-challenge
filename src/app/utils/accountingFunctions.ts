import { AccountType, ValueType } from "../types/enums";
import { AccountCategory } from "../types/enums";
import { AccountData } from "../types/types";

const filterByRevOrExp = (
  movements: AccountData[],
  revenueOrExpense: AccountCategory.REVENUE | AccountCategory.EXPENSE
): AccountData[] => {
  return movements.filter(
    (movement) => movement.account_category === revenueOrExpense
  );
};

const filterByAccountAndValueType = (
  movements: AccountData[],
  accountType: AccountType,
  valueType: ValueType
) => {
  const filteredData = movements.filter((movement) => {
    return (
      movement.account_type === accountType && movement.value_type === valueType
    );
  });
  return filteredData;
};

const filterByCatAccValType = (
  movements: AccountData[],
  category: string,
  valueType: ValueType,
  accountTypes: AccountType[]
) => {
  const filteredData = movements.filter((movement) => {
    return (
      movement.account_category === category &&
      movement.value_type === valueType &&
      accountTypes.includes(movement.account_type)
    );
  });
  return filteredData;
};

// Revenue
// This should be calculated by adding up all the values under total_value where the account_category field is set to revenue
export const revenue = (movements: AccountData[]): number => {
  const revenueMovements = filterByRevOrExp(movements, AccountCategory.REVENUE);
  const totalRevenue = revenueMovements.reduce(
    (accumulator, revenueMovement) => {
      return accumulator + revenueMovement.total_value;
    },
    0
  );
  return totalRevenue;
};

// Expenses
// This should be calculated by adding up all the values under total_value where the account_category field is set to expense
export const expense = (movements: AccountData[]): number => {
  const expenseMovements = filterByRevOrExp(movements, AccountCategory.EXPENSE);
  const totalExpense = expenseMovements.reduce(
    (accumulator, expenseMovement) => {
      return accumulator + expenseMovement.total_value;
    },
    0
  );
  return totalExpense;
};

// Gross Profit Margin
// This is calculated in two steps: first by adding all the total_value fields where the account_type is set to sales and the value_type is set to debit; then dividing that by the revenue value calculated earlier to generate a percentage value.
export const grossProfitMargin = (
  movements: AccountData[],
) => {
  const filteredSales = filterByAccountAndValueType(
    movements,
    AccountType.SALES,
    ValueType.DEBIT
  );
  const totalSales = filteredSales.reduce(
    (accumulator, sale) => accumulator + sale.total_value,
    0
  );
  const totalRevenue = revenue(movements)
  const grossProfitMarginValue = totalSales / totalRevenue;
  return grossProfitMarginValue;
};

// Net Profit Margin
// This metric is calculated by subtracting the expenses value from the revenue value and dividing the remainder by revenue to calculate a percentage.
export const netProfitMargin = (movements: AccountData[]) => {
  const totalRevenue = revenue(movements);
  const totalExpense = expense(movements);
  const netProfitMarginValue = (totalRevenue - totalExpense) / totalRevenue;
  return netProfitMarginValue;
};

// Working Capital Ratio
// This is calculated dividing the assets by the liabilities creating a percentage value where assets are calculated by:
// adding the total_value from all records where the account_category is set to assets, the value_type is set to debit, and the account_type is one of current, bank, or current_accounts_receivable
// subtracting the total_value from all records where the account_category is set to assets, the value_type is set to credit, and the account_type is one of current, bank, or current_accounts_receivable
// and liabilities are calculated by:
// adding the total_value from all records where the account_category is set to liability, the value_type is set to credit, and the account_type is one of current or current_accounts_payable
// subtracting the total_value from all records where the account_category is set to liability, the value_type is set to debit, and the account_type is one current or current_accounts_payable
export const workingCapitalRatio = (movements: AccountData[]) => {
  const assets = () => {
    const filteredDebitAssets = filterByCatAccValType(
      movements,
      "assets",
      ValueType.DEBIT,
      [AccountType.CURRENT, AccountType.BANK, AccountType.CURRENT_AR]
    );
    const totalDebitAssets = filteredDebitAssets.reduce(
      (accumulator, asset) => {
        return accumulator + asset.total_value;
      },
      0
    );
    const filteredCreditAssets = filterByCatAccValType(
      movements,
      "assets",
      ValueType.CREDIT,
      [AccountType.CURRENT, AccountType.BANK, AccountType.CURRENT_AR]
    );
    const totalCreditAssets = filteredCreditAssets.reduce(
      (accumulator, asset) => {
        return accumulator + asset.total_value;
      },
      0
    );
    return totalDebitAssets - totalCreditAssets;
  };
  const totalAssets = assets()
  const liabilities = () => {
    const filteredCreditLiabilities = filterByCatAccValType(
      movements,
      "liability",
      ValueType.CREDIT,
      [AccountType.CURRENT, AccountType.CURRENT_AP]
    );
    const totalCreditLiabilities = filteredCreditLiabilities.reduce(
      (accumulator, liability) => {
        return accumulator + liability.total_value;
      },
      0
    );
    const filteredDebitLiabilities = filterByCatAccValType(
      movements,
      "liability",
      ValueType.DEBIT,
      [AccountType.CURRENT, AccountType.CURRENT_AP]
    );
    const totalDebitLiabilities = filteredDebitLiabilities.reduce(
      (accumulator, liability) => {
        return accumulator + liability.total_value;
      },
      0
    );
    return totalCreditLiabilities - totalDebitLiabilities;
  };
  const totalLiabilities = liabilities()
  return totalAssets / totalLiabilities
};
