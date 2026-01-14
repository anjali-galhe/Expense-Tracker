import { Link } from "react-router-dom";
import "../style/Home.css";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const Home = () => {
  return (
    
    <div className="home-container">
  <h1>Take Control of <span>Your Finances</span></h1>
  <p>Track loans, manage EMIs, and visualize your wealth in one simple dashboard.</p>
      <div className="home-buttons">
        {/* <button className="primary-btn">Get Started</button> */}
    {/* <button className="secondary-btn">Learn More</button> */}
        <Link to="/add-transaction">
          <button>Add Transaction</button>
        </Link>

        <Link to="/dashboard">
          <button>View Dashboard</button>
        </Link>
      </div>

      <ul className="features">
        <li>Instant Loan Tracking</li>
    <li>EMI Reminders</li>
    <li>Interactive Charts</li>
    <li>Secure Profiles</li>
    </ul>
    </div>
  );
};

export default Home;
