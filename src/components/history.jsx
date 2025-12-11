import React from "react";
import "../style/history.css";

const History = ({ transactions }) => {
  return (
    <div className="history-wrapper">
      <h2 className="history-title"><u>History</u></h2>

      {transactions.length === 0 ? (
        <p className="no-history">No transaction available yet!!</p>
      ) : (
        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>

                {/* Show only for loans */}
                <th>Interest</th>
                <th>Duration</th>
                <th>Total Payable</th>

                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => {
                const isLoan = item.type === "Loan" || item.type === "Taken" || item.type === "Given";

                return (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>₹{item.loanAmount || item.amount}</td>

                    {/* Loan Fields */}
                    {isLoan ? (
                      <>
                        <td>{item.interest}%</td>
                        <td>{item.duration} months</td>
                        <td>₹{item.totalPayable}</td>
                      </>
                    ) : (
                      <>
                        <td>—</td>
                        <td>—</td>
                        <td>—</td>
                      </>
                    )}

                    <td>{item.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
