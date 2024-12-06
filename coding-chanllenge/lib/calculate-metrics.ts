import jsonData from '@/data.json'

interface AccountItem {
  account_name: string;
  account_category: string;
  account_type: string;
  value_type: string;
  total_value: number;
}

// Ensure data is properly typed and accessible
const data: AccountItem[] = Array.isArray(jsonData) ? jsonData : jsonData.data || []

export interface FinancialMetrics {
  revenue: number;
  expenses: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  workingCapitalRatio: number;
}

export function getMetricBreakdowns() {
  // Ensure we're working with an array and handle the data structure properly
  const revenue = data.filter((item: AccountItem) => 
    item.account_category === 'revenue'
  )

  const expenses = data.filter((item: AccountItem) => 
    item.account_category === 'expense'
  )

  const grossProfit = data.filter((item: AccountItem) => 
    item.account_type === 'sales' && 
    item.value_type === 'debit'
  )

  const netProfit = [
    ...revenue,
    ...expenses.map(item => ({
      ...item,
      total_value: -item.total_value
    }))
  ]

  const currentAssets = data.filter((item: AccountItem) => 
    item.account_category === 'assets' && 
    ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type)
  )

  const currentLiabilities = data.filter((item: AccountItem) => 
    item.account_category === 'liability' && 
    ['current', 'current_accounts_payable'].includes(item.account_type)
  )

  return {
    revenue,
    expenses,
    grossProfit,
    netProfit,
    currentAssets,
    currentLiabilities
  }
}

export function calculateMetrics(): FinancialMetrics {
  // Calculate Revenue
  const revenue = data.filter((item: AccountItem) => 
    item.account_category === 'revenue'
  )
    .reduce((sum, item) => sum + item.total_value, 0)

  // Calculate Expenses
  const expenses = data.filter((item: AccountItem) => 
    item.account_category === 'expense'
  )
    .reduce((sum, item) => sum + item.total_value, 0)

  // Calculate Gross Profit Margin
  const salesValue = data.filter((item: AccountItem) => 
    item.account_type === 'sales' && 
    item.value_type === 'debit'
  )
    .reduce((sum, item) => sum + item.total_value, 0)
  const grossProfitMargin = (salesValue / revenue) * 100

  // Calculate Net Profit Margin
  const netProfitMargin = ((revenue - expenses) / revenue) * 100

  // Calculate Assets
  const assets = data.filter((item: AccountItem) => 
    item.account_category === 'assets' && 
    ['current', 'bank', 'current_accounts_receivable'].includes(item.account_type)
  )
    .reduce((sum, item) => {
      if (item.value_type === 'debit') return sum + item.total_value
      if (item.value_type === 'credit') return sum - item.total_value
      return sum
    }, 0)

  // Calculate Liabilities
  const liabilities = data.filter((item: AccountItem) => 
    item.account_category === 'liability' && 
    ['current', 'current_accounts_payable'].includes(item.account_type)
  )
    .reduce((sum, item) => {
      if (item.value_type === 'credit') return sum + item.total_value
      if (item.value_type === 'debit') return sum - item.total_value
      return sum
    }, 0)

  // Calculate Working Capital Ratio
  const workingCapitalRatio = (assets / liabilities) * 100

  return {
    revenue,
    expenses,
    grossProfitMargin,
    netProfitMargin,
    workingCapitalRatio
  }
} 