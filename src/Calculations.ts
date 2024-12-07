import fs from 'fs';

type Account = {
  account_category: string;
  value_type: string;
  total_value: number;
  account_type: string;
};

type Data = {
  data: Account[];
};


  const formatCurrency = (value: number): string => {
  return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

 const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const readDataFile = (filePath: string): Data => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
};


export const Revenue = (accounts: Account[]): number => {
  return accounts
    .filter(account => account.account_category === 'revenue')
    .reduce((sum, account) => sum + account.total_value, 0);
};

 export const Expenses = (accounts: Account[]): number => {
  return accounts
    .filter(account => account.account_category === 'expense')
    .reduce((sum, account) => sum + account.total_value, 0);
};

export const GrossProfitMargin = (accounts: Account[], revenue: number): string => {
  const sales = accounts.filter(
    account => account.account_type === 'sales' && account.value_type === 'debit'
  );
  const grossProfit = sales.reduce((sum, account) => sum + account.total_value, 0);
  const grossProfitMargin = grossProfit / revenue;
  return formatPercentage(grossProfitMargin);
};

export const NetProfitMargin = (revenue: number, expenses: number): string => {
  const netProfitMargin = (revenue - expenses) / revenue;
  return formatPercentage(netProfitMargin);
};

export const WorkingCapitalRatio = (accounts: Account[]): string => {
  const assets = accounts
    .filter(
      account =>
        account.account_category === 'assets' &&
        account.value_type === 'debit' &&
        ['current', 'bank', 'current_accounts_receivable'].includes(account.account_type)
    )
    .reduce((sum, account) => sum + account.total_value, 0);

  const liabilities = accounts
    .filter(
      account =>
        account.account_category === 'liability' &&
        account.value_type === 'credit' &&
        ['current', 'current_accounts_payable'].includes(account.account_type)
    )
    .reduce((sum, account) => sum + account.total_value, 0);

    const workingCapitalRatio = assets / liabilities;
  return formatPercentage(workingCapitalRatio);
};

export const Metrics = (filePath: string): void => {
  const data = readDataFile(filePath);
  const accounts = data.data;

  const revenue = Revenue(accounts);
  const expenses = Expenses(accounts);
  const grossProfitMargin = GrossProfitMargin(accounts, revenue);
  const netProfitMargin = NetProfitMargin(revenue, expenses);
  const workingCapitalRatio = WorkingCapitalRatio(accounts);

  console.log(`Revenue: ${formatCurrency(revenue)}`);
  console.log(`Expenses: ${formatCurrency(expenses)}`);
  console.log(`Gross Profit Margin: ${grossProfitMargin}`);
  console.log(`Net Profit Margin: ${netProfitMargin}`);
  console.log(`Working Capital Ratio: ${workingCapitalRatio}`);
};
