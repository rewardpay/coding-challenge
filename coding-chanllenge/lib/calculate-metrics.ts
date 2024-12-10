import jsonData from '@/data.json'
import { AccountItem, FinancialMetrics } from './definitions'


// Ensure data is properly typed and accessible
const data: AccountItem[] = Array.isArray(jsonData) ? jsonData : jsonData.data || []


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
  try {
    // Validate data array
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid or empty data array')
    }

    // Calculate Revenue with validation
    const revenue = data.filter((item: AccountItem) => 
      item?.account_category === 'revenue' && typeof item?.total_value === 'number'
    )
      .reduce((sum, item) => sum + item.total_value, 0)

    if (revenue <= 0) {
      throw new Error('Invalid revenue: Revenue must be greater than 0')
    }

    // Calculate Expenses with validation
    const expenses = data.filter((item: AccountItem) => 
      item?.account_category === 'expense' && typeof item?.total_value === 'number'
    )
      .reduce((sum, item) => sum + item.total_value, 0)

    if (expenses < 0) {
      throw new Error('Invalid expenses: Expenses cannot be negative')
    }

    // Calculate Gross Profit Margin with validation
    const salesValue = data.filter((item: AccountItem) => 
      item?.account_type === 'sales' && 
      item?.value_type === 'debit' &&
      typeof item?.total_value === 'number'
    )
      .reduce((sum, item) => sum + item.total_value, 0)

    const grossProfitMargin = (salesValue / revenue) * 100
    if (isNaN(grossProfitMargin) || !isFinite(grossProfitMargin)) {
      throw new Error('Invalid gross profit margin calculation')
    }

    // Calculate Net Profit Margin with validation
    const netProfitMargin = ((revenue - expenses) / revenue) * 100
    if (isNaN(netProfitMargin) || !isFinite(netProfitMargin)) {
      throw new Error('Invalid net profit margin calculation')
    }

    // Calculate Assets with validation
    const assets = data.filter((item: AccountItem) => 
      item?.account_category === 'assets' && 
      ['current', 'bank', 'current_accounts_receivable'].includes(item?.account_type || '') &&
      typeof item?.total_value === 'number' &&
      ['debit', 'credit'].includes(item?.value_type || '')
    )
      .reduce((sum, item) => {
        if (item.value_type === 'debit') return sum + item.total_value
        if (item.value_type === 'credit') return sum - item.total_value
        return sum
      }, 0)

    if (assets <= 0) {
      throw new Error('Invalid assets: Total assets must be greater than 0')
    }

    // Calculate Liabilities with validation
    const liabilities = data.filter((item: AccountItem) => 
      item?.account_category === 'liability' && 
      ['current', 'current_accounts_payable'].includes(item?.account_type || '') &&
      typeof item?.total_value === 'number' &&
      ['debit', 'credit'].includes(item?.value_type || '')
    )
      .reduce((sum, item) => {
        if (item.value_type === 'credit') return sum + item.total_value
        if (item.value_type === 'debit') return sum - item.total_value
        return sum
      }, 0)

    if (liabilities <= 0) {
      throw new Error('Invalid liabilities: Total liabilities must be greater than 0')
    }

    // Calculate Working Capital Ratio with validation
    const workingCapitalRatio = (assets / liabilities) * 100
    if (isNaN(workingCapitalRatio) || !isFinite(workingCapitalRatio)) {
      throw new Error('Invalid working capital ratio calculation')
    }

    return {
      revenue,
      expenses,
      grossProfitMargin,
      netProfitMargin,
      workingCapitalRatio
    }
  } catch (error) {
    console.error('Error calculating metrics:', error)
    // Return default safe values
    return {
      revenue: 0,
      expenses: 0,
      grossProfitMargin: 0,
      netProfitMargin: 0,
      workingCapitalRatio: 0
    }
  }
} 