'use client'

import { Bill } from "../types";
import { useFinances } from "../use-finances";

export default function DashboardAside() {
  const { bills } = useFinances()

  function getTotalThisMonth(bills: Bill[]) {
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()
    const billsThisMonth = bills.filter(bill => {
      const billDate = bill.dueDate
      return billDate.getMonth() === thisMonth && billDate.getFullYear() === thisYear
    })
    const total = billsThisMonth.reduce((acc, bill) => acc + bill.amount, 0)
    return total
  }

  const totalThisMonth = getTotalThisMonth(bills)
  return (
    <aside className="bg-primary basis-1/4">
      <ul>
        <li>
          <h1>este mes</h1>
          <span>{totalThisMonth}</span>
        </li>
      </ul>
    </aside>
  )
}
