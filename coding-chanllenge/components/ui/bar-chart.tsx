"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Loading from "@/components/ui/loading"
import { ChartConfig } from "@/lib/definitions"
import { MetricChart } from "@/components/ui/MetricChart"

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
