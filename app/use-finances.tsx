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
      { id: 1, name: 'Electricidad', amount: 65.75, dueDate: new Date(2026, 0, 20) },
      { id: 2, name: 'Agua', amount: 28.5, dueDate: new Date(2026, 0, 25) },
      { id: 3, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 0, 5) },
      { id: 4, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 0, 15) },

      { id: 5, name: 'Electricidad', amount: 70.2, dueDate: new Date(2026, 1, 20) },
      { id: 6, name: 'Agua', amount: 30.1, dueDate: new Date(2026, 1, 24) },
      { id: 7, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 1, 5) },
      { id: 8, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 1, 15) },
      { id: 9, name: 'Seguro del coche', amount: 55.0, dueDate: new Date(2026, 1, 10) },

      { id: 10, name: 'Electricidad', amount: 68.9, dueDate: new Date(2026, 2, 20) },
      { id: 11, name: 'Agua', amount: 27.8, dueDate: new Date(2026, 2, 25) },
      { id: 12, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 2, 5) },
      { id: 13, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 2, 15) },
      { id: 14, name: 'Gimnasio', amount: 29.99, dueDate: new Date(2026, 2, 8) },

      { id: 15, name: 'Electricidad', amount: 60.3, dueDate: new Date(2026, 3, 20) },
      { id: 16, name: 'Agua', amount: 29.4, dueDate: new Date(2026, 3, 25) },
      { id: 17, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 3, 5) },
      { id: 18, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 3, 15) },
      { id: 19, name: 'Spotify', amount: 10.99, dueDate: new Date(2026, 3, 12) },

      { id: 20, name: 'Electricidad', amount: 72.6, dueDate: new Date(2026, 4, 20) },
      { id: 21, name: 'Agua', amount: 31.0, dueDate: new Date(2026, 4, 25) },
      { id: 22, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 4, 5) },
      { id: 23, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 4, 15) },
      { id: 24, name: 'Amazon Prime', amount: 4.99, dueDate: new Date(2026, 4, 18) },

      { id: 25, name: 'Electricidad', amount: 80.45, dueDate: new Date(2026, 5, 20) },
      { id: 26, name: 'Agua', amount: 33.2, dueDate: new Date(2026, 5, 25) },
      { id: 27, name: 'Internet', amount: 40.0, dueDate: new Date(2026, 5, 5) },
      { id: 28, name: 'Suscripción streaming', amount: 12.99, dueDate: new Date(2026, 5, 15) },
      { id: 29, name: 'Seguro del hogar', amount: 120.0, dueDate: new Date(2026, 5, 30) }
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

