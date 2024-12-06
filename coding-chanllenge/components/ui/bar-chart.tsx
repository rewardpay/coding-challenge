"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { calculateMetrics, getMetricBreakdowns } from "@/lib/calculate-metrics"

const metrics = calculateMetrics()
const breakdowns = getMetricBreakdowns()

// Format data for each chart
const revenueData = breakdowns.revenue.map(item => ({
  name: item.account_name,
  value: item.total_value
}))

const expensesData = breakdowns.expenses.map(item => ({
  name: item.account_name,
  value: item.total_value
}))

const grossProfitData = breakdowns.grossProfit.map(item => ({
  name: item.account_name,
  value: (item.total_value / metrics.revenue) * 100
}))

const netProfitData = breakdowns.netProfit.map(item => ({
  name: item.account_name,
  value: (item.total_value / metrics.revenue) * 100
}))

const workingCapitalData = [
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
]

const formatValue = (value: number, isPercentage: boolean) => {
  if (isPercentage) {
    return `${value.toFixed(1)}%`
  }
  return `$${value.toLocaleString()}`
}

// Add this interface near the top of the file
interface ChartData {
  name: string;
  value?: number;
  assets?: number;
  liabilities?: number;
}

// Update the MetricChart props type
const MetricChart = ({ 
  data, 
  title,
  isPercentage = false,
  isDouble = false,
  total,
}: { 
  data: ChartData[];  // Replace any[] with ChartData[]
  title: string;
  isPercentage?: boolean;
  isDouble?: boolean;
  total: number;
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">
      {title}: {formatValue(total, isPercentage)}
    </h3>
    <div className="h-[400px] w-full">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 60,
          bottom: 120,
        }}
        width={800}
        height={400}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          interval={0}
          height={100}
          tick={{
            dx: -8,
            dy: 10,
            fontSize: 12
          }}
        />
        <YAxis
          tickFormatter={(value) => formatValue(value, isPercentage)}
          tick={{
            fontSize: 12
          }}
        />
        <Tooltip
          formatter={(value: number) => [formatValue(value, isPercentage), title]}
          cursor={{ fill: 'transparent' }}
        />
        <Legend 
          verticalAlign="top"
          height={36}
        />
        {isDouble ? (
          <>
            <Bar 
              dataKey="assets" 
              fill="hsl(var(--chart-1))" 
              name="Assets"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="liabilities" 
              fill="hsl(var(--chart-2))" 
              name="Liabilities"
              radius={[4, 4, 0, 0]}
            />
          </>
        ) : (
          <Bar 
            dataKey="value"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            name={title}
          />
        )}
      </BarChart>
    </div>
  </div>
)

export function Barchart() {
  const [activeChart, setActiveChart] = React.useState<string>("expenses")

  const charts = {
    revenue: { data: revenueData, title: "Revenue", total: metrics.revenue },
    expenses: { data: expensesData, title: "Expenses", total: metrics.expenses },
    grossProfit: { 
      data: grossProfitData, 
      title: "Gross Profit Margin", 
      total: metrics.grossProfitMargin,
      isPercentage: true 
    },
    netProfit: { 
      data: netProfitData, 
      title: "Net Profit Margin", 
      total: metrics.netProfitMargin,
      isPercentage: true 
    },
    workingCapital: { 
      data: workingCapitalData, 
      title: "Working Capital Ratio", 
      total: metrics.workingCapitalRatio,
      isPercentage: true,
      isDouble: true 
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Financial Metrics Overview</CardTitle>
        <CardDescription>
          Key accounting metrics from the general ledger
        </CardDescription>
        <div className="flex gap-2 mt-4">
          {Object.entries(charts).map(([key, { title }]) => (
            <Button
              key={key}
              variant={activeChart === key ? "default" : "outline"}
              onClick={() => setActiveChart(key)}
            >
              {title}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <MetricChart 
          {...charts[activeChart as keyof typeof charts]}
        />
      </CardContent>
    </Card>
  )
}
