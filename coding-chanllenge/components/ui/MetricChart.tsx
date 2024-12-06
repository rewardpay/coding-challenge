import { formatValue } from "@/lib/utils"
import { ChartConfig } from "@/lib/definitions"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function MetricChart({ 
  data, 
  title, 
  total, 
  isPercentage = false, 
  isDouble = false 
}: ChartConfig) {
  return (
    <div className="space-y-2 sm:space-y-4">
      <div className="flex justify-between items-center px-2 sm:px-4">
        <h3 className="text-sm sm:text-base font-medium">{title}</h3>
        <div className="text-right">
          <span className="text-xs sm:text-sm text-muted-foreground mr-2">Total: </span>
          <span className="text-sm sm:text-base font-semibold">
            {formatValue(total, isPercentage)}
          </span>
        </div>
      </div>
      
      <div className="h-[250px] sm:h-[350px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ 
              top: 20, 
              right: 10, 
              left: 0, 
              bottom: 60 
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              className="opacity-50"
            />
            <XAxis 
              dataKey="name" 
              tick={{ 
                fontSize: 12,
                fill: 'currentColor',
                className: "text-xs sm:text-sm"
              }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ 
                fontSize: 12,
                fill: 'currentColor',
                className: "text-xs sm:text-sm"
              }}
              tickFormatter={(value) => formatValue(value, isPercentage)}
              width={60}
            />
            <Tooltip
              formatter={(value: number) => [formatValue(value, isPercentage), title]}
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                padding: '0.5rem'
              }}
              labelStyle={{
                fontSize: '0.875rem',
                marginBottom: '0.25rem'
              }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
              wrapperStyle={{
                fontSize: '0.875rem',
                paddingBottom: '1rem'
              }}
            />
            {isDouble ? (
              <>
                <Bar 
                  dataKey="assets" 
                  fill="hsl(var(--chart-1))" 
                  name="Assets"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
                <Bar 
                  dataKey="liabilities" 
                  fill="hsl(var(--chart-2))" 
                  name="Liabilities"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </>
            ) : (
              <Bar 
                dataKey="value"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                name={title}
                maxBarSize={60}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}