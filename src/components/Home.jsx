import { Link } from "react-router-dom";
import "../style/home.css";


const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Expense Tracker</h1>
      <p>Track your income & expenses easily and manage your finances smartly.</p>

      <div className="home-buttons">
        <Link to="/add-transaction">
          <button>Add Transaction</button>
        </Link>

        <Link to="/dashboard">
          <button>View Dashboard</button>
        </Link>
      </div>

      <ul className="features">
        <li>✔ Track all your expenses & income</li>
        <li>✔ View summary data and reports</li>
        <li>✔ Simple & powerful financial dashboard</li>
      </ul>
    </div>
  );
};

export default Home;
