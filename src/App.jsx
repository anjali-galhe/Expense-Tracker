import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ExpenseTracker from "./components/Transaction";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Settings from "./components/Setting";
import Loan from "./components/loan";
import History from "./components/history";
import Login from "./Pages/Login";
import Signup from "./Pages/signup";

function App() {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

   const [incomeCategories, setIncomeCategories] = useState(["Salary", "Bonus"]);
  const [expenseCategories, setExpenseCategories] = useState(["Food", "Rent"]);

  return (
    <>
      {isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="/add-transaction"
          element={
            <ExpenseTracker
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard transactions={transactions} />}
        />

        <Route
          path="/loan"
          element={
            <Loan
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />

<Route
          path="/settings"
          element={
            <Settings
              incomeCategories={incomeCategories}
              setIncomeCategories={setIncomeCategories}
              expenseCategories={expenseCategories}
              setExpenseCategories={setExpenseCategories}
            />
          }
        />
        <Route
          path="/history"
          element={<History transactions={transactions} />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
