import React, { useState } from "react";
import "../style/loan.css";

const Loan = ({ transactions, setTransactions }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [date, setDate] = useState("");
  const [interest, setInterest] = useState("");
  const [duration, setDuration] = useState("");

  // Calculate payable amount (rounded)
  const rawTotal =
    loanAmount && interest && duration
      ? Number(loanAmount) +
        (Number(loanAmount) * Number(interest) / 100) * Number(duration)
      : 0;

  const totalPayable = Math.round(rawTotal);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLoan = {
      type: "Loan",
      loanAmount,
      date,
      interest,
      duration,
      totalPayable,
    };

    setTransactions([...transactions, newLoan]);

    setLoanAmount("");
    setInterest("");
    setDuration("");
    setDate("");

    alert(`Total Payable Amount: ₹${totalPayable}`);
  };

  return (
    <div className="loan-container">
      <h2>Loan🏠</h2>

      <form onSubmit={handleSubmit} className="loan-form">
        <label>Loan Amount (₹)</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />

        <label>Interest Rate (%)</label>
        <input
          type="number"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />

        <label>Duration (Months)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {totalPayable > 0 && (
          <div className="payable-box">
            <strong>Total Payable Amount: </strong>
            ₹{totalPayable}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Loan;
