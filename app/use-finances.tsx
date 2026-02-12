'use client'
import { createContext, ReactNode, useContext, useState } from "react";
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
  const [bills, setBills] = useState<Bill[]>(
    [
      { id: 1, name: 'Electricidad', amount: 65.75, dueDate: new Date(2026, 1, 20) },
      { id: 2, name: 'Agua', amount: 28.5, dueDate: new Date(2026, 1, 25) },
      { id: 3, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 1, 1) },
      { id: 4, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 1, 15) },
    ]
  );

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

