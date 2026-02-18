'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Bill } from "./types";
import { usePathname } from "next/navigation";

const FinancesContext = createContext<{
  bills: Bill[];
  addBill: (bill: Bill) => void;
  removeBill: (id: number) => void;
  updateBill: (newBill: Bill, id: number) => void
}>({
  bills: [],
  addBill: () => {},
  removeBill: () => {},
  updateBill: () => {},
});

export default function FinancesProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<Bill[]>([]);

  const pathname = usePathname()

  useEffect(() => {    
    fetch('/api/bills')
    .then(res => res.json())
    .then(result => setBills(result.map((bill: Bill) => (
        {
          ...bill, 
          dueDate: new Date(bill.dueDate) 
        }
      ) 
    )))
    .catch((error) => {
      console.log(error)
    })
  }, [pathname])

  const addBill = (bill: Bill) => {
    setBills((prevBills) => [...prevBills, bill]);
    fetch('/api/bills', {
      method: 'POST',
      body: JSON.stringify({bill})
    })
  };

  const removeBill = (id: number) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
    fetch('/api/bills', {
      method: 'DELETE',
      body: JSON.stringify({id})
    })
  };

  const updateBill = (newBill: Bill, id: number) => {
    setBills((prevBills) => prevBills.map((bill) => bill.id === id ? newBill : bill ))
    fetch('/api/bills', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        bill: newBill
      })
    })
  }

  return (
    <FinancesContext.Provider value={{ bills, addBill, removeBill, updateBill }}>
      {children}
    </FinancesContext.Provider>
  );
}

export function useFinances() {
  const context = useContext(FinancesContext);
  if (!context) {
    throw new Error("useFinances must be used within a FinancesProvider");
  }
  return context;
}

