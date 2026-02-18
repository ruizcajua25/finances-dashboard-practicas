'use client'
import { Bar, BarChart, Tooltip, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { useFinances } from "../use-finances";
import { useState } from "react";
import TrashIcon from "./trash-icon";
import { Bill } from "../types";

export default function Dashboard() {
  const ViewsDictionary = {
    dashboard: 'dashboard',
    list: 'bill-list'
  }
  const [view, setView] = useState(ViewsDictionary.list)

  const chartConfig = {
    bills: {
      label: 'Gastos',
      color: 'var(--color-primary)'
    }
  } satisfies ChartConfig

  const { bills, removeBill, updateBill } = useFinances()

  const handleUpdate = (id: number, newData: object) => {
    const currentBill = bills.find((bill) => bill.id === id)!
    const newBill : Bill = {...currentBill, ...newData}
    updateBill(newBill, id)
  };

  const billsByMonth = getBillsByMonth();

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
      <div className="flex-1 overflow-auto h-full 
            scrollbar-thin 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-secondary
            [&::-webkit-scrollbar-thumb]:bg-tertiary
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-track]:rounded-full
            ">
        {
          view === ViewsDictionary.dashboard &&
            <ChartContainer config={chartConfig} className="h-full w-full">
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
                <Tooltip 
                  wrapperStyle={{backgroundColor: '#f00'}}
                />
              </BarChart>
            </ChartContainer>
        }

        {
          view === ViewsDictionary.list &&
          <ul className="flex gap-2 flex-col mr-4">
            {bills.map((bill) => (
              <li 
              key={bill.id}
              className="flex items-center bg-secondary p-2 rounded justify-between"
              dir=""
              >
                <div className="flex gap-5">
                  <span>
                    <input 
                      className="field-sizing-content" 
                      type="number" 
                      defaultValue={bill.amount}
                      onBlur={(e) => handleUpdate(bill.id, { amount: Number(e.target.value) })}
                    />&euro;
                  </span>
                  <input 
                    type="text" 
                    defaultValue={bill.name}
                    onBlur={(e) => handleUpdate(bill.id, { name: String(e.target.value) })}
                  />
                </div>
                <button className="size-10 hover:bg-amber-500 transition rounded-full" onClick={() => removeBill(bill.id)}><TrashIcon></TrashIcon></button>
              </li>
            ))}
          </ul>
        }

      </div>
      <aside className="flex flex-col bg-secondary min-h-full rounded-lg basis-52 flex-0">
        <ul className="
        flex flex-col flex-1 gap-4 p-4  
        *:flex *:flex-col *:flex-1 *:shrink-0 *:rounded-sm *:bg-tertiary
        [&_button]:size-full [&_button]:flex-1
        ">
          <li>
            <button onClick={() => setView(ViewsDictionary.dashboard)}>
              Dash Board
            </button>
          </li>
          <li>
            <button onClick={() => setView(ViewsDictionary.list)}>
              List
            </button>
          </li>
        </ul>
      </aside>
    </section>
  );
}