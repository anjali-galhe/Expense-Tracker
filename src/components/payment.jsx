import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/payment.css";
const Payment = ({ balance, makePayment, addPaymentTransaction }) => {
  const [personName, setPersonName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = () => {
    if (!personName || !bankName || !accountNumber || !ifscCode || !amount) {
      toast.error("Please fill all fields!");
      return;
    }

    if (Number(amount) > balance) {
      toast.error("❌ Insufficient balance.");
      return;
    }

    makePayment(Number(amount));

    const newPayment = {
      type: "Payment",
      amount: Number(amount),
      personName,
      bankName,
      accountNumber,
      ifscCode,
      date: new Date().toLocaleDateString(),
    };

    addPaymentTransaction(newPayment);

    toast.success("✅ Payment Successful!");

    setPersonName("");
    setBankName("");
    setAccountNumber("");
    setIfscCode("");
    setAmount("");
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Send Money</h2>

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
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="payment-btn" onClick={handlePayment}>
        Pay Now
      </button>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Payment;
