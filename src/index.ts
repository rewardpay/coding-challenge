type Table = {
  revenue: number;
  expenses: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  workingCapitalRatio: number;
};

const table: Table = {
  revenue: 1000,
  expenses: 500,
  grossProfitMargin: 500,
  netProfitMargin: 500,
  workingCapitalRatio: 500,
};

console.table(table);
