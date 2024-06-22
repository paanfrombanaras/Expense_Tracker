import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [expense, setExpense] = useState({ type: "", cost: "" });
  const [history, setHistory] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleAdd = () => {
    const newCost = parseFloat(expense.cost);
    if (expense.type && !isNaN(newCost)) {
      setTotalExpense(totalExpense + newCost);
      const newHistory = [...history, { id: uuidv4(), type: expense.type, cost: newCost }];
      setHistory(newHistory);
      setCurrentBalance(currentBalance - newCost);
      setExpense({ type: "", cost: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center bg-gray-100 overflow-x-hidden">
        <div className="hero w-2/5 bg-violet-300 p-8 rounded-lg shadow-lg flex flex-col items-center gap-5">
          <div className="title font-bold text-2xl text-slate-900 mb-4">
            Expense Tracker
          </div>
          <div className="balance flex flex-col items-center bg-white w-2/5 rounded m-auto">
            <div className="text-lg">Your Balance:</div>
            <div className="currBalance text-2xl font-semibold">{currentBalance}</div>
          </div>
          <div className="expense flex flex-col items-center">
            <div className="expenseText text-lg">Your Expense:</div>
            <div className="expense text-2xl font-semibold text-red-500">{totalExpense}</div>
          </div>
          <div className="history w-full flex flex-col gap-4 items-center">
            <div className="text-lg">History:</div>
            <div className="expenses w-full h-40 overflow-y-scroll border-2 border-red-800 p-2 bg-white">
              {history.map((item) => (
                <div key={item.id} className="expense-item flex justify-between py-1 px-2 my-1 border-b border-gray-300">
                  <div className="type font-serif text-xl">{item.type}</div>
                  <div className="amount text-red-500 font-semibold text-xl">{item.cost}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="add w-full flex flex-col items-center">
            <div className="text-lg mb-2">Add New Transaction</div>
            <div className="type w-full mb-2">
              <div>Enter Type:</div>
              <input
                type="text"
                placeholder="Enter type..."
                name="type"
                value={expense.type}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="cost w-full mb-4">
              <div>Enter Cost:</div>
              <input
                type="number"
                placeholder="Enter cost..."
                name="cost"
                value={expense.cost}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 w-full text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Add
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
