import Dashboard from "./components/dashboard";
import DashboardAside from "./components/dashboard-aside";
import InsertBill from "./components/insert-bill";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex flex-col h-screen gap-10 p-10 *:rounded-lg">
      <InsertBill></InsertBill>
      <div className="flex-1 flex gap-10 *:rounded-lg min-h-0">
        <DashboardAside></DashboardAside>
        <Dashboard></Dashboard>
      </div>
    </main>
  );
}
