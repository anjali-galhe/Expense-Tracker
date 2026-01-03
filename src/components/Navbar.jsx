import React from "react";
import { Link,useNavigate } from "react-router-dom";
import '../style/navbar.css';  
const Navbar = () => {
  const navigate =useNavigate();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
  const currentUser = users.find(u => u.id === currentUserId);
  const handlelogout=()=>{

    //localStorage.removeItem("userInfo");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/");

  }

  return (
    <nav className="navbar">
 {/*<img  className="logo" src={logo} alt="Logo"/>*/}
 <Link to="/profile" className="profile-link">
  {currentUser?.profilePic ? (
    <img src={currentUser.profilePic} alt="Profile" className="profile-img"/>
  ) : (
    <div className="profile-initial">
      {currentUser?.email?.charAt(0).toUpperCase() || "U"}
    </div>
  )}
</Link>
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
