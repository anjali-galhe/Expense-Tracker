import React from "react";
import { Link,useNavigate } from "react-router-dom";
import '../style/navbar.css';  
import logo from '../assets/unnamed.jpg';
const Navbar = () => {
  const navigate =useNavigate();
  const handlelogout=()=>{

    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLoggedIn");
    navigate("/");

  }

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
       {/*<Link to="/settings">Settings</Link>*/}
       <button onClick={handlelogout} className="lbtn">logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
