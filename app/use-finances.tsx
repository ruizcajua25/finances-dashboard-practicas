'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Bill } from "./types";

const FinancesContext = createContext<{
  bills: Bill[];
  addBill: (bill: Bill) => void;
  removeBill: (id: number) => void;
}>({
  bills: [],
  addBill: () => {},
  removeBill: () => {},
});

export default function FinancesProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<Bill[]>([]);


  console.log(bills)
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
  }, [])

  const addBill = (bill: Bill) => {
    setBills((prevBills) => [...prevBills, bill]);
  };

  const removeBill = (id: number) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  };

  return (
    <FinancesContext.Provider value={{ bills, addBill, removeBill }}>
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

