export default function InsertBill() {
  return ( 
    <form className="bg-primary p-5">
      <input type="text" placeholder="Bill Name" />
      <input type="number" placeholder="Amount" />
      <input type="date" placeholder="Due Date" />
      <button type="submit">Add Bill</button>
    </form>
  );
}