'use client'

import { useFinances } from "../use-finances";

export default function DashboardAside() {
  const { bills } = useFinances()

  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()

  const billsThisMonth = bills.filter(b => 
    b.dueDate.getMonth() === thisMonth && b.dueDate.getFullYear() === thisYear
  )

  const billsThisYear = bills.filter(b => 
    b.dueDate.getFullYear() === thisYear
  )
  const totalThisMonth = billsThisMonth.reduce((acc, b) => acc + b.amount, 0).toFixed(2)
  const lastMonthDate = new Date(thisYear, thisMonth - 1, 1)

  const totalThisYear = billsThisYear.reduce((acc, b) => acc + b.amount, 0).toFixed(2)
  const totalLastMonth = bills
    .filter(b => 
      b.dueDate.getMonth() === lastMonthDate.getMonth() && 
      b.dueDate.getFullYear() === lastMonthDate.getFullYear()
    )
    .reduce((acc, b) => acc + b.amount, 0)
  const totalAllTime = Number(bills.reduce((acc, b) => acc + b.amount, 0).toFixed(2))
  const maxBill = bills.length > 0 ? Math.max(...bills.map(b => b.amount)) : 0
  const countThisMonth = billsThisMonth.length
  const averageBill = bills.length > 0 ? totalAllTime / bills.length : 0

  return (
    <aside className="bg-primary basis-56 flex-0">
      <ul className="
      flex flex-col p-4 gap-3 uppercase h-full
      *:bg-secondary *:rounded *:p-3 *:text-center [&_span]:text-3xl [&_span]:font-bold *:flex-1 ">
        <li>
          <h1>This Month</h1>
          <span>{totalThisMonth}</span>
        </li>
        <li>
          <h1>This Year</h1>
          <span>{totalThisYear}</span>
        </li>
        <li>
          <h1>Last Month</h1>
          <span>{totalLastMonth}</span>
        </li>
        <li>
          <h1>Maximum</h1>
          <span>{maxBill}</span>
        </li>
        <li>
          <h1>Global Total</h1>
          <span>{totalAllTime}</span>
        </li>
        <li>
          <h1>Count</h1>
          <span>{countThisMonth}</span>
        </li>
        <li>
          <h1>Average</h1>
          <span>{averageBill.toFixed(2)}</span>
        </li>
      </ul>
    </aside>
  )
}