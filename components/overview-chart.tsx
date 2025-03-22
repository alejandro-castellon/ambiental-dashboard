"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { overviewChartData } from "@/lib/data";
import { MapPoint } from "@/lib/types";

const chartConfig = {
  ph: {
    label: "Ph",
    color: "hsl(var(--chart-1))",
  },
  temp: {
    label: "T°",
    color: "red",
  },
  con: {
    label: "Con",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function OverviewChart({ point }: { point: MapPoint }) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Gráfico de {point.title}</CardTitle>
        <CardDescription>01 Abril - 07 Abril 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={overviewChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 2)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="ph"
              type="monotone"
              stroke="var(--color-ph)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="temp"
              type="monotone"
              stroke="var(--color-temp)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="con"
              type="monotone"
              stroke="var(--color-con)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Aumento de 5.2% esta semana <TrendingUp className="h-4 w-4" />
            </div>
            <Link
              href={`/${point.id}`}
              className="bg-cyan-900 hover:bg-cyan-700 font-bold py-2 px-4 rounded text-center"
            >
              <span className="text-white">Ver detalles</span>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
