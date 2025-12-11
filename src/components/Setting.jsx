import React, { useState } from 'react';

const Settings = ({
  incomeCategories,
  setIncomeCategories,
  expenseCategories,
  setExpenseCategories,
}) => {
  const [newIncomeCat, setNewIncomeCat] = useState('');
  const [newExpenseCat, setNewExpenseCat] = useState('');

  const handleAddIncomeCategory = () => {
    if (newIncomeCat.trim() && !incomeCategories.includes(newIncomeCat.trim())) {
      setIncomeCategories([...incomeCategories, newIncomeCat.trim()]);
      setNewIncomeCat('');
    }
  };

  const handleAddExpenseCategory = () => {
    if (newExpenseCat.trim() && !expenseCategories.includes(newExpenseCat.trim())) {
      setExpenseCategories([...expenseCategories, newExpenseCat.trim()]);
      setNewExpenseCat('');
    }
  };

  const handleRemoveIncomeCategory = (cat) => {
    setIncomeCategories(incomeCategories.filter(c => c !== cat));
  };

  const handleRemoveExpenseCategory = (cat) => {
    setExpenseCategories(expenseCategories.filter(c => c !== cat));
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <section className="setting-section">
        <h3>Income Categories</h3>
        <ul className="category-list">
          {incomeCategories.map(cat => (
            <li key={cat}>
              {cat}
              <button onClick={() => handleRemoveIncomeCategory(cat)} className="remove-btn">x</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add new income category"
          value={newIncomeCat}
          onChange={e => setNewIncomeCat(e.target.value)}
        />
        <button className='btn1' onClick={handleAddIncomeCategory}>Add</button>
      </section>

      <section className="setting-section">
        <h3>Expense Categories</h3>
        <ul className="category-list">
          {expenseCategories.map(cat => (
            <li key={cat}>
              {cat}
              <button onClick={() => handleRemoveExpenseCategory(cat)} className="remove-btn">x</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add new expense category"
          value={newExpenseCat}
          onChange={e => setNewExpenseCat(e.target.value)}
        />
        <button className='btn1' onClick={handleAddExpenseCategory}>Add</button>
      </section>
    </div>
  );
};

export default Settings;
