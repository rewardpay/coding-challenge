import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartConfig } from "@/lib/definitions"
import { formatValue } from "@/lib/utils"

export const MetricChart = ({ 
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
      <div className="h-[600px] w-full">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 60,
            bottom: 120,
          }}
          width={800}
          height={600}
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