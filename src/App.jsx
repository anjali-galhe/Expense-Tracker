import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseTracker from "./components/Transaction";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Settings from "./components/Setting";
import Loan from "./components/loan";
import History from "./components/history";
import Login from "./Pages/Login";
import Signup from "./Pages/signup";
import Payment from "./components/payment";

function App() {

  const addPaymentTransaction = (payment) => {
  setTransactions([...transactions, payment]);
};

  const [balance, setBalance] = useState(5000);
  const makePayment = (amount) => {
  setBalance(balance - amount);
};
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
          path="/payment"
            element={
         <Payment
         balance={balance}
      makePayment={makePayment}
      addPaymentTransaction={addPaymentTransaction}
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
            <ToastContainer position="top-center" />

    </>
  );
}

export default App;
