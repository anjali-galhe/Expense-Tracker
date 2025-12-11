import React from "react";
import { Link } from "react-router-dom";
import '../style/navbar.css';  

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Expense Tracker</h2>

      <div className="nav-links">
        <Link to="/"></Link>
        <Link to="/home">Home</Link>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-transaction">Add Transaction</Link>
        <Link to="/loan">Loan</Link>
        <Link to="/history">History</Link>
        <Link to="/settings">Settings</Link>

      </div>
    </nav>
  );
};

export default Navbar;
