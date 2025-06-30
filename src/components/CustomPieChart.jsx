"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a custom label";

const CustomPieChart = ({
  chartData,
  dataKey,
  title,
  periode,
  nameKey,
  chartConfig,
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <label htmlFor="" className="text-gray-400 text-sm">
            {title}
          </label>
        </CardTitle>
      </CardHeader>
      <CardContent className=" pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey={nameKey} hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey={dataKey}
              labelLine={false}
              innerRadius={60}
              nameKey={nameKey}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default CustomPieChart;
