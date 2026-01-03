import React, { useState, useEffect } from "react";
import "../style/loan.css";
import Navbar from "./Navbar";
import  toast,{ Toaster } from 'react-hot-toast';


const Loan = ({transactions =[], setTransactions}) => {
  // const loanTransactions = transactions.filter(
  //   (t) => t.type === "Loan"
  // );
  const loanTransactions = transactions.filter((t) => t.type === "Loan");

  

  const [loanAmount, setLoanAmount] = useState("");
  const [date, setDate] = useState("");
  const [interest, setInterest] = useState("");
  const [duration, setDuration] = useState("");
  const [emi, setEmi] = useState(0);


useEffect(() => {
 const P = Number(loanAmount);
  const R = Number(interest) / 12 / 100;
  const N = Number(duration);
  if (P > 0 && R > 0 && N > 0) {
    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    setEmi(Math.round(emiValue));
  } else {
    setEmi(0);
  }
}, [loanAmount, interest, duration]);
 //useEffect(() => {
  //Emi();
//}, [loanAmount, interest, duration]);

//  const loanTransactions = transactions.filter(
//   (t) => t.type === "Loan"
// );




  // const rawTotal =
  //   loanAmount && interest && duration
  //     ? Number(loanAmount) +
  //       (Number(loanAmount) * Number(interest) / 100) * Number(duration)
  //     : 0;

  // const totalPayable = Math.round(rawTotal);
  const totalPayable = emi > 0 ? emi * Number(duration) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLoan = {
      id : Date.now(),
      type: "Loan",
      loanAmount : Number(loanAmount),
      amount : Number(loanAmount),
      date: date,
      interest : Number(interest),
      duration : Number(duration),
      totalPayable: totalPayable,
      emi : emi,
      category : "Loan Disbursement"
    };

    setTransactions([...transactions, newLoan]);

    //users[userIndex].transactions.push(newLoan);
    //localStorage.setItem("users", JSON.stringify(users));
    //setTransactions([...transactions, newLoan]);
toast.success(`Loan Added! Monthly EMI: ₹${emi}`);
    setLoanAmount("");
    setInterest("");
    setDuration("");
    setDate("");
    setEmi(0);

   // alert(`T otal Payable Amount: ₹${totalPayable}`);
  };
  return (
    <><Navbar/>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <div className="loan-container">
      <h2>Loan🏠</h2>

      <form onSubmit={handleSubmit} className="loan-form">
        <label>Loan Amount (₹)</label>
        <input
          type="number"
          min={0}
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />

        <label>Interest Rate (%)</label>
        <input
          type="number"
          min={0}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />

        <label>Duration (Months)</label>
        <input
          type="number"
          min={0}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label>EMI</label>
        <input 
        type="number"
        min={0}
        value={emi}
        onChange={(e) => setEmi(e.target.value)}
        readOnly></input>


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
  
</>
  );
};

export default Loan;
