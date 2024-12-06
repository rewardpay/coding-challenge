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
import Loading from "@/components/ui/loading"

interface ChartData {
  name: string;
  value?: number;
  assets?: number;
  liabilities?: number;
}

interface ChartConfig {
  data: ChartData[];
  title: string;
  total: number;
  isPercentage?: boolean;
  isDouble?: boolean;
}

const formatValue = (value: number, isPercentage: boolean) => {
  if (isPercentage) {
    return `${value.toFixed(1)}%`
  }
  return `$${value.toLocaleString()}`
}

const MetricChart = ({ 
  data, 
  title,
  isPercentage = false,
  isDouble = false,
  total,
}: ChartConfig) => (
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
            dy: 50,
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
  const [charts, setCharts] = React.useState<Record<string, ChartConfig>>({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('/api/metrics')
      .then(res => res.json())
      .then(data => {
        setCharts(data.charts)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch metrics:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="flex h-screen justify-center items-center">
        <Loading />
    </div>
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
        {charts[activeChart] && (
          <MetricChart {...charts[activeChart]} />
        )}
      </CardContent>
    </Card>
  )
}
