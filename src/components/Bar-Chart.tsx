"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartData } from "@/app/Types"


export const description = "A bar chart with a label"

const chartData = [
  { month: "January", applicatons: 186 },
  { month: "February", applicatons: 305 },
  { month: "March", applicatons: 237 },
  { month: "April", applicatons: 73 },
  { month: "May", applicatons: 209 },
  { month: "June", applicatons: 214 },
]

const chartConfig = {
  applicatons: {
    label: "applicatons",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig

interface barChartDataProps {
  barChartData : ChartData[]
}

export function BarChartComponent({ barChartData }: barChartDataProps) {
  
  return (
    <Card >
      <CardHeader>
        <CardTitle>エントリーグラフ</CardTitle>
        <CardDescription>六ヶ月以内</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className="p-4">
          <BarChart
            accessibilityLayer
            data={barChartData}
            margin={{
              top: 30,
            }}
            className=""
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="applicatons" fill="var(--color-desktop)" radius={12}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground "
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
{/*         <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  )
}
