import * as fs from "fs";
import * as path from "path";
import {
  AccountCategory,
  AccountType,
  srcDataSchema,
  ValueType,
} from "./schema";
import { formatCurrency, formatPercentage } from "./utils";

type Table = {
  revenue: number;
  expenses: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  workingCapitalRatio: number;
};

type FormattedTable = {
  revenue: string;
  expenses: string;
  grossProfitMargin: string;
  netProfitMargin: string;
  workingCapitalRatio: string;
};

const filePath = path.join(__dirname, "..", "data.json"); // Navigate one level up to locate the JSON file

// Read and parse the JSON file
const fileData = fs.readFileSync(filePath, "utf-8");
const jsonData = JSON.parse(fileData);

export const dataProcess = (jsonData: unknown) => {
  // Data validation
  const { success, data } = srcDataSchema.safeParse(jsonData);

  if (!success) {
    throw new Error("Invalid data type");
  } else {
    const datas = data.data;
    // Revenue
    const revenues = datas.filter(
      (data) => data.account_category === AccountCategory.REVENUE
    );
    const revenueSum = revenues.reduce(
      (acc, curr) => acc + curr.total_value,
      0
    );
    console.log("Revenue: ", revenueSum);
    // Expenses
    const expenses = datas.filter(
      (data) => data.account_category === AccountCategory.EXPENSE
    );
    const expensesSum = expenses.reduce(
      (acc, curr) => acc + curr.total_value,
      0
    );
    console.log("Expenses: ", expensesSum);
    // Gross Profit Margin
    const gp = datas.filter(
      (data) =>
        data.account_type === AccountType.SALES &&
        data.value_type === ValueType.DEBIT
    );
    const gpSum = gp.reduce((acc, curr) => acc + curr.total_value, 0);
    const grossProfitMargin = gpSum / revenueSum;
    console.log("Gross Profit Margin: ", grossProfitMargin);
    // Net Profit Margin
    const netProfitMargin = (revenueSum - expensesSum) / revenueSum;
    console.log("Net Profit Margin: ", netProfitMargin);

    // Working Capital Ratio
    // Part 1: Assets
    const assetsDataArray = datas.filter(
      (data) =>
        data.account_category === AccountCategory.ASSETS &&
        [
          AccountType.BANK,
          AccountType.CURRENT,
          AccountType.CURRENT_ACCOUNTS_RECEIVABLE,
        ].includes(data.account_type)
    );

    const positiveAssets = assetsDataArray.filter(
      (data) => data.value_type === ValueType.DEBIT
    );

    const negativeAssets = assetsDataArray.filter(
      (data) => data.value_type === ValueType.CREDIT
    );

    const assetsSum =
      positiveAssets.reduce((acc, curr) => acc + curr.total_value, 0) -
      negativeAssets.reduce((acc, curr) => acc + curr.total_value, 0);

    // Part 2: Liabilities
    const liabilitiesDataArray = datas.filter(
      (data) =>
        data.account_category === AccountCategory.LIABILITY &&
        [AccountType.CURRENT, AccountType.CURRENT_ACCOUNTS_PAYABLE].includes(
          data.account_type
        )
    );

    const positiveLiabilities = liabilitiesDataArray.filter(
      (data) => data.value_type === ValueType.CREDIT
    );

    const negativeLiabilities = liabilitiesDataArray.filter(
      (data) => data.value_type === ValueType.DEBIT
    );

    const liabilitiesSum =
      positiveLiabilities.reduce((acc, curr) => acc + curr.total_value, 0) -
      negativeLiabilities.reduce((acc, curr) => acc + curr.total_value, 0);

    const workingCapitalRatio = assetsSum / liabilitiesSum;
    console.log("Working Capital Ratio: ", workingCapitalRatio);

    const calculationTable: Table = {
      revenue: Math.round(revenueSum),
      expenses: Math.round(expensesSum),
      grossProfitMargin: Math.round(grossProfitMargin * 1000) / 1000,
      netProfitMargin: Math.round(netProfitMargin * 1000) / 1000,
      workingCapitalRatio: Math.round(workingCapitalRatio * 1000) / 1000,
    };

    const formattedTable: FormattedTable = {
      revenue: formatCurrency.format(revenueSum),
      expenses: formatCurrency.format(expensesSum),
      grossProfitMargin: formatPercentage.format(grossProfitMargin),
      netProfitMargin: formatPercentage.format(netProfitMargin),
      workingCapitalRatio: formatPercentage.format(workingCapitalRatio),
    };

    console.table(formattedTable);

    return calculationTable;
  }
};

dataProcess(jsonData);
