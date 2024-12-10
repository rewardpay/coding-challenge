export interface ChartData {
    name: string;
    value?: number;
    assets?: number;
    liabilities?: number;
  }
  
export interface ChartConfig {
    data: ChartData[];
    title: string;
    total: number;
    isPercentage?: boolean;
    isDouble?: boolean;
  }

  export interface FinancialMetrics {
    revenue: number;
    expenses: number;
    grossProfitMargin: number;
    netProfitMargin: number;
    workingCapitalRatio: number;
  }
  
  export interface AccountItem {
    account_name: string;
    account_category: string;
    account_type: string;
    value_type: string;
    total_value: number;
  }
  