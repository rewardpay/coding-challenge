import { calculateMetrics, getMetricBreakdowns } from "@/lib/calculate-metrics"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const metrics = calculateMetrics()
    const breakdowns = getMetricBreakdowns()

    const data = {
      metrics,
      charts: {
        revenue: {
          data: breakdowns.revenue.map(item => ({
            name: item.account_name,
            value: item.total_value
          })),
          title: "Revenue",
          total: metrics.revenue
        },
        expenses: {
          data: breakdowns.expenses.map(item => ({
            name: item.account_name,
            value: item.total_value
          })),
          title: "Expenses",
          total: metrics.expenses
        },
        grossProfit: {
          data: breakdowns.grossProfit.map(item => ({
            name: item.account_name,
            value: (item.total_value / metrics.revenue) * 100
          })),
          title: "Gross Profit Margin",
          total: metrics.grossProfitMargin,
          isPercentage: true
        },
        netProfit: {
          data: breakdowns.netProfit.map(item => ({
            name: item.account_name,
            value: (item.total_value / metrics.revenue) * 100
          })),
          title: "Net Profit Margin",
          total: metrics.netProfitMargin,
          isPercentage: true
        },
        workingCapital: {
          data: [
            ...breakdowns.currentAssets.map(item => ({
              name: item.account_name,
              assets: item.total_value,
              liabilities: 0
            })),
            ...breakdowns.currentLiabilities.map(item => ({
              name: item.account_name,
              assets: 0,
              liabilities: item.total_value
            }))
          ],
          title: "Working Capital Ratio",
          total: metrics.workingCapitalRatio,
          isPercentage: true,
          isDouble: true
        }
      }
    }

    return NextResponse.json(data)
  } catch  {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
} 