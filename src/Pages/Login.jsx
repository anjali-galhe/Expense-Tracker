import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style/login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  // always get array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    setError("No account found. Please sign up first.");
    return;
  }

  // find matching user
  const currentUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!currentUser) {
    setError("Invalid email or password!");
    return;
  }

  // login success
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUserId", currentUser.id);

  setIsLoggedIn(true);
  navigate("/home");
};


  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required 
        />

        <input 
          type="password" 
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required 
        />

        <button type="submit">Login</button>
      </form>

      {error && <p className="auth-error">{error}</p>}

      <p>
        Don't have an account? <Link to="/signup">Create account</Link>
      </p>
    </div>
  );
};

export default Login;
