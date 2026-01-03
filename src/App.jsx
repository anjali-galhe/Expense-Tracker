import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ExpenseTracker from "./components/Transaction";
import Dashboard from "./components/Dashboard";
import History from "./components/history";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Payment from "./components/payment";
import Loan from "./components/loan";
import Home from "./components/Home";
import Profile from "./components/profile";

function App() {
  const navigate = useNavigate();

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== "/" && window.location.pathname !== "/signup") {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Transactions state
  const [transactions, setTransactions] = useState(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    const currentUser = users.find((u) => u.id === currentUserId);
    return currentUser ? currentUser.transactions || [] : [];
    //const saved = localStorage.getItem("transactions");
    //return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    const updatedUsers = users.map((user) => {
      if (user.id === currentUserId) {
        return { ...user, transactions : transactions };

      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, [transactions]);
  // Persist transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Calculate balance
  const balance = transactions.reduce((total, t) => {
    const amount = Number(t.amount) || 0;
    const type = t.type?.toLowerCase();

    if (type === "income") return total + amount;
    if (type === "expense") return total - amount;
    return total;
  }, 0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route 
  path="/profile" 
  element={
    <Profile 
      transactions={transactions} 
      balance={balance} 
    />
  } 
/>
        
    <Route path="/home" element={<Home />} />
    
         
        <Route
          path="/add-transaction"
          element={
            <ExpenseTracker
              transactions={transactions}
              setTransactions={setTransactions}
              balance={balance} // optional
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard transactions={transactions} balance={balance} />}
        />

        <Route
          path="/loan"
          element={<Loan transactions={transactions} setTransactions={setTransactions} />}
        />

        <Route
          path="/payment"
          element={
            <Payment
              transactions={transactions}
              setTransactions={setTransactions}
              balance={balance} // optional
            />
          }
        />

        <Route path="/history" element={<History transactions={transactions} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
