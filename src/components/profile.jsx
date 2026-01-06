import React from "react";
import Navbar from "./Navbar";
import "../style/Profile.css"; // Ensure you create this CSS file

const Profile = ({ transactions, balance }) => {
  // 1. Get User Info from LocalStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
  const currentUser = users.find((u) => u.id === currentUserId);

  // 2. Calculate Stats for the Profile
  const totalIncome = transactions
    .filter((t) => t.type?.toLowerCase() === "income")
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.type?.toLowerCase() === "expense")
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const loanCount = transactions.filter((t) => t.type === "Loan").length;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {currentUser?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            {/* <h2>{currentUser?.name || "User Name"}</h2> */}
            <p className="email">{currentUser?.email || "user@example.com"}</p>
          </div>

          <hr />

          <div className="profile-stats">
            <div className="stat-item">
              <span>Total Balance</span>
              <h3 className="balance-text">₹{balance}</h3>
            </div>
            <div className="stat-row">
              <div className="stat-box">
                <span>Income</span>
                <p className="income-amt">₹{totalIncome}</p>
              </div>
              <div className="stat-box">
                <span>Expenses</span>
                <p className="expense-amt">₹{totalExpense}</p>
              </div>
            </div>
            <div className="stat-item">
              <span>Active Loans</span>
              <p>{loanCount} Loans Registered</p>
            </div>
          </div>

          <button 
            className="logout-btn" 
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("currentUserId");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;