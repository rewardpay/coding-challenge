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
    return <div className="flex h-[calc(100vh-2rem)] justify-center items-center p-4">
        <Loading />
    </div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4 md:px-6">
      <CardHeader className="space-y-2 sm:space-y-4">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl text-center sm:text-left">
          Financial Metrics Overview
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-center sm:text-left">
          Key accounting metrics from the general ledger
        </CardDescription>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2 sm:mt-4">
          {Object.entries(charts).map(([key, { title }]) => (
            <Button
              key={key}
              variant={activeChart === key ? "default" : "outline"}
              onClick={() => setActiveChart(key)}
              className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            >
              {title}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6">
        {charts[activeChart] && (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[320px]">
              <MetricChart {...charts[activeChart]} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
