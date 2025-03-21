"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chartData } from "@/lib/data";

const chartConfig = {
  ph: {
    label: "Ph",
    color: "hsl(var(--chart-2))",
  },
  temp: {
    label: "T°",
    color: "red",
  },
  con: {
    label: "Conductivity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("ph");

  // Calculate totals for each metric
  const totals = React.useMemo(
    () => ({
      ph: chartData.reduce((acc, curr) => acc + curr.ph, 0),
      temp: chartData.reduce((acc, curr) => acc + curr.temp, 0),
      con: chartData.reduce((acc, curr) => acc + curr.con, 0),
    }),
    []
  );

  // Filter data based on time range
  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date);
      const referenceDate = new Date("2024-06-30");
      let daysToSubtract = 90;
      if (timeRange === "30d") {
        daysToSubtract = 30;
      } else if (timeRange === "7d") {
        daysToSubtract = 7;
      }
      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return date >= startDate;
    });
  }, [timeRange]);

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-0 border-b py-5 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1 text-left">
          <CardTitle>Datos de los sensores</CardTitle>
          <CardDescription>
            Mostrando resultados de los últimos{" "}
            {timeRange === "90d"
              ? "3 meses"
              : timeRange === "30d"
              ? "30 días"
              : "7 días"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="mt-3 w-[160px] rounded-lg sm:mt-0 sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <div className="flex flex-wrap border-b">
        {Object.keys(chartConfig).map((key) => {
          const chart = key as keyof typeof chartConfig;
          return (
            <button
              key={chart}
              data-active={activeChart === chart}
              className="flex flex-1 flex-col justify-center gap-1 border-r px-6 py-4 text-center last:border-r-0 data-[active=true]:bg-muted/50 sm:min-w-[120px] sm:py-5"
              onClick={() => setActiveChart(chart)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[chart].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-2xl">
                {totals[chart].toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>

      <CardContent className="pl-0 pt-4 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.keys(chartConfig).map((key) => (
                <linearGradient
                  key={`fill${key}`}
                  id={`fill${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {/* Solo mostrar el área chart activo */}
            <Area
              dataKey={activeChart}
              type="monotone"
              fill={`url(#fill${activeChart})`}
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
