'use client'
import { Bar, BarChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { useFinances } from "../use-finances";

export default function Dashboard() {
  const chartConfig = {
    bills: {
      label: 'Gastos',
      color: 'var(--color-primary)'
    }
  } satisfies ChartConfig

  const { bills } = useFinances()

  const billsByMonth = getBillsByMonth();

  console.log(billsByMonth)

  function getBillsByMonth() {
    const billsByMonth: Record<string, number> = {};

    bills.forEach((bill) => {
      const month = bill.dueDate.toLocaleString('default', { month: 'long' });
      if (!billsByMonth[month]) {
        billsByMonth[month] = 0;
      }

      billsByMonth[month] += bill.amount;
    });

    return billsByMonth;
  }

  const data = Object.entries(billsByMonth).map(([month, spent]) => ({
    month,
    spent
  }))
  
  return (
    <section className="bg-primary flex-1 flex items-center p-10 gap-10">
      <div className="flex-1">
        <ChartContainer config={chartConfig} className="min-h-50 w-full">
          <BarChart accessibilityLayer data={data}>
            <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3).toUpperCase()}
            className="font-bold text-lg"
            />
            <Bar dataKey="spent" fill="var(--color-tertiary)" radius={7} />
          </BarChart>
        </ChartContainer>
      </div>

      <aside className="basis-1/5 flex flex-col bg-secondary min-h-full rounded-lg">
        <ul className="flex flex-col flex-1 *:bg-tertiary *:flex-1 *:shrink-0 *:rounded-sm gap-4 p-4">
          <li>
            
          </li>
          <li>

          </li>
          <li>

          </li>
          <li>

          </li>
        </ul>
      </aside>
    </section>
  );
}
