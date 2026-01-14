import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../style/Payment.css";
import Navbar from "./Navbar";
import { Toaster } from 'react-hot-toast';



const Payment = ({ balance, transactions, setTransactions }) => {
  const [personName, setPersonName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState("");





  // 1. Get current month identifier (e.g., "2026-01")
  const currentMonth = new Date().toISOString().slice(0, 7);

  // 2. Identify Pending EMIs
  // Find all loans and filter out the ones already paid this month
  const pendingLoans = transactions.filter((t) => {
    if (t.type !== "Loan") return false;

    // Check if there is an 'Expense' transaction for this specific Loan ID in this month
    const isPaid = transactions.some(
      (pay) => 
        pay.category === "EMI Payment" && 
        pay.loanId === t.id && 
        pay.date.startsWith(currentMonth)
    );
    return !isPaid;
  });

  // 3. Handle EMI Payment
  const handleEmiPay = (loan) => {
    if (loan.emi > balance) {
      console.log(balance, loan.emi);
      toast.error("Insufficient balance to pay EMI!");
      return;
    }

    const emiPayment = {
      id: Date.now(),
      loanId: loan.id, // Links this payment to the loan
      type: "Payment",
      amount: loan.emi,
      category: "EMI Payment",
      description: `EMI for Loan: ${loan.category || 'Personal'}`,
      date: new Date().toISOString().split("T")[0],
    };

    setTransactions([...transactions, emiPayment]);
    toast.success(`EMI of ₹${loan.emi} paid successfully!`);
  };


  const handlePayment = () => {
    if (!personName || !bankName || !accountNumber || !ifscCode || !amount) {
      toast.error("Please fill all fields!");

      return;
    }

    const payAmount = Number(amount);
     if (payAmount > balance) {
       toast.error("Insufficient balance!");
       return;
    }

    if (payAmount <= 0) {
      toast.error("Amount must be greater than zero!");
      return;
    }

    
    //makePayment(Number(amount));

    const newPayment = {
      id: Date.now(),
      type: "Expense",
      amount: payAmount,
      category: "Bank Transfer",


      personName,
      bankName,
      accountNumber,
      ifscCode,
      date :new Date().toISOString().split("T")[0],
    };

    setTransactions([...transactions, newPayment]);

    //addPaymentTransaction(newPayment);
// toast.success("✅ Payment Successful!");


toast.success(`₹${payAmount} sent to ${personName} successfully!`);

     setPersonName("");
    setBankName("");
    setAccountNumber("");
    setIfscCode("");
    setAmount("")

  
  };

  return (
    <><Navbar/>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>

    <div className="payment-container">
      {pendingLoans.length > 0 && (
        <div className="emi-section">
          <h3>Pending EMIs ({new Date().toLocaleString('default', { month: 'long' })})</h3>
          <div className="emi-list">
            {pendingLoans.map((loan) => (
              <div key={loan.id} className="emi-card">
                <div className="emi-info">
                  <strong>{loan.category || "Loan"}</strong>
                  <span>EMI Amount: ₹{loan.emi}</span>
                </div>
                <button
                className="pay-emi-btn" onClick={() => handleEmiPay(loan)}>Pay EMI</button>
              </div>
            ))}
          </div>
          
                </div>
      )}
      <h2 className="payment-title">
💸Bank Transfer
💸</h2>

      <label className="payment-label">Name:</label>
      <input
        className="payment-input"
        type="text"
        value={personName}
        onChange={(e) => setPersonName(e.target.value)}
      />

      <label className="payment-label">Bank Name:</label>
      <input
        className="payment-input"
        type="text"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />

      <label className="payment-label">Account Number:</label>
      <input
        className="payment-input"
        type="text"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />

      <label className="payment-label">IFSC Code:</label>
      <input
        className="payment-input"
        type="text"
        value={ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
      />

      <label className="payment-label">Amount:</label>
      <input
        className="payment-input"
        type="number"
        min={0}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="payment-btn" onClick={handlePayment}>
        Pay Now
      </button>

      {/* <ToastContainer position="top-center" /> */}
    </div></>
  );
};

export default Payment;
