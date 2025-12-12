import React from "react";
import { Link } from "react-router-dom";
import '../style/navbar.css';  
import logo from '../assets/unnamed.jpg';
const Navbar = () => {
  return (
    <nav className="navbar">
 <img  className="logo" src={logo} alt="Logo"/>
      <div className="nav-links">
        <Link to="/"></Link>
        <Link to="/home">Home</Link>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-transaction">Add Transaction</Link>
        <Link to="/loan">Loan</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/history">History</Link>
        <Link to="/settings">Settings</Link>

      </div>
    </nav>
  );
};

export default Navbar;
