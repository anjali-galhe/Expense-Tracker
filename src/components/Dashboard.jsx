import React, { useEffect, useState } from "react";
import "../style/Dashboard.css";
import Navbar from "./Navbar";


const Dashboard = ({transactions,balance}) => {
  const [totalIncome, settotalIncome] = useState(0);
  const [totalExpense, settotalExpense] = useState(0);
    const [totalLoan, settotalLoan] = useState(0);
    const [displayBalance , setdisplayBalance] = useState(0);

  

  //const users = JSON.parse(localStorage.getItem("users")) || [];
  //const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));

 // const currentUser = users.find(u => u.id === currentUserId);
  //const transactions = currentUser?.transactions || [];



useEffect(() => {
  if (!transactions || transactions.length === 0) {
    settotalIncome(0);
    settotalExpense(0);
    settotalLoan(0);
    setdisplayBalance(0);
    return;
  }

  const income = transactions
    .filter(t => t.type === "Income")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const expense = transactions
    .filter(t => t.type === "Expense")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const loan = transactions
    .filter(t => t.type === "Loan")
    .reduce((acc, curr) => acc + Number(curr.loanAmount || 0), 0);

  const balanceValue = income - expense + loan;

  settotalIncome(income);
  settotalExpense(expense);
  settotalLoan(loan);
  setdisplayBalance(balanceValue);

  localStorage.setItem("userBalance", balanceValue);

}, [transactions]);

  return (
    <><Navbar/>
    <div className="dashboard-container">
      <h1>Dashboard📊📈</h1>

      <div className="summary-cards">
        <div className="card income">
          <h3>Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card expense">
          <h3>Expense</h3>
          <p>₹{totalExpense}</p>
        </div>
        <div className="card loan">
          <h3>Loan</h3>
          <p>₹{totalLoan}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{displayBalance}</p>
        </div>
      </div>


      <h2 className="section-title">Recent Transactions</h2>
      <ul className="transaction-list">
        {transactions.length > 0 ? (
       transactions.slice(-5).reverse().map((t, index) => (
  <li key={index}>
    <span>{t.date}</span>

    <span>{t.category || t.type}</span>

    <span
      style={{
        color:
          t.type === "Expense"
            ? "#ff4e4e"
            : t.type === "Loan"
            ? "#3498db"
            : t.type === "Payment"
            ? "#7344e2ff"
            : "#2ecc71", 
      }}
    >
      ₹{t.type === "Loan" ? t.loanAmount : t.amount}
    </span>
  </li>
))
        ) : (
          <p>No transactions available.</p>
        )}


      </ul>
    </div>
    </>
  );
};

export default Dashboard;
