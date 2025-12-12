import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/transaction.css";


const ExpenseTracker = ({ transactions, setTransactions }) => {
  const [selectedOption, setSelectedOption] = useState("Expense");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !category || !paymentMethod || !date) {
      alert("Please fill all required fields!");
      return;
    }

     if (selectedOption === "Expense" && Number(amount) > balance) {
    alert("Balance is not sufficient!");
    return;
  }

    const newTransaction = {
      id: Date.now(),
      type: selectedOption,
      category,
      amount: Number(amount),
      date,
      paymentMethod,
      description,
    };

    setTransactions([...transactions, newTransaction]); 

    setCategory("");
    setPaymentMethod("");
    setAmount("");
    setDate("");
    setDescription("");

    navigate("/dashboard");
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="tracker">
      <h2>MANAGE YOUR INCOME/EXPENSES💰</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Transaction type:</label>

        <label>
          <input
            type="radio"
            name="transactionType"
            value="Expense"
            checked={selectedOption === "Expense"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Expense
        </label>

        <label>
          <input
            type="radio"
            name="transactionType"
            value="Income"
            checked={selectedOption === "Income"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Income
        </label>

        <br />
        <br />

        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>

            {selectedOption === "Expense" && (
              <>
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Rent">Rent</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business Expense">Business Expense</option>
                <option value="Others">Others</option>
              </>
            )}

            {selectedOption === "Income" && (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Bonus">Bonus</option>
                <option value="Gifts">Gifts</option>
                <option value="Investment Return">Investment Return</option>
                <option value="Business">Business</option>
                <option value="Others">Others</option>
              </>
            )}
          </select>
        </label>

        <br />
        <br />

        <label>
          Amount:
          <input
            type="number"
            placeholder="Enter Amount.."
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <br />
        <br />

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <br />
        <br />

        <label>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
          </select>
        </label>

        <br />
        <br />

        <label>
          Description:
          <input
            type="text"
            name="description"
            placeholder="Add description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <br />
        <br />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default ExpenseTracker;
