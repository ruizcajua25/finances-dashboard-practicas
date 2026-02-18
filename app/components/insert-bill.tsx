'use client'
import { useFinances } from "../use-finances";

export default function InsertBill() {
  const { addBill } = useFinances() 

  function handleSubmit (form: FormData) {
    const name = form.get('name') as string
    const dueDate = form.get('due-date') as string
    const amount = form.get('amount') as string

    if (!name || !amount || !dueDate) return
    
    const newBill = {
      dueDate: new Date(dueDate),
      name,
      amount: Number(amount),
      id: Math.floor(Math.random() * 10000)
    } 

    addBill(newBill)
  }

  return ( 
    <form action={handleSubmit} className="bg-primary p-5">
      <input type="text" placeholder="Bill Name" name="name" />
      <input type="number" placeholder="Amount" name="amount"/>
      <input type="date" placeholder="Due Date" name="due-date" />
      <button type="submit">Add Bill</button>
    </form>
  );
}