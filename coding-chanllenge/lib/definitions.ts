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