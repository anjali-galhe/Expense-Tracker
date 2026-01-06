import React from "react";
import "../style/history.css";
import Navbar from "./Navbar";
import html2pdf from "html2pdf.js";

const History = ( {transactions= []}) => {



  const generatePDF = () => {
    const element = document.getElementById("pdf-content");
    const options = {
       margin: 0.5,
      filename: 'history.pdf',
      image: { type: 'jpeg', quality: 1},
      html2canvas: { 
        scale: 2 ,
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
    };



    //particular logic
    const getParticulars = (item) => {
  // Check category first for more detail
  if (item.category === "Bank Transfer") return `Payment to ${item.personName}`;
  if (item.category === "EMI Payment") return "EMI Paid";
  
  // Then check general types
  if (item.type === "Loan") return "Loan Taken";
  if (item.type === "Income") return "Income Received";
  if (item.type === "Expense") return "Expense Incurred";
  
  return item.type;
};

  return (
        <>
        <Navbar/>
        <div className="history-page">
      <div className="btn-container">
    <button className="pdf-button" onClick={generatePDF}><span>📥</span> Download PDF Report</button>
</div>
    <div id ="pdf-content">
    <div className="history-wrapper">
      <h2 className="history-title"><u>History</u></h2>
 {/*<input
 // type="text"
  //placeholder="Search by type or amount..."
  //onChange={(e) => setSearch(e.target.value)}
/> */}

      {transactions.length === 0 ? (
        <p className="no-history">No transaction available yet!!</p>
      ) : (
        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Particulars</th>
                <th>Debit(+)</th>
                <th>Credit(-)</th>

                {/* Show only for loans */}

              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => {
                 //const isAddition = item.type === "Income" || item.type === "Loan";
                 //const displayAmount = item.amount || item.loanAmount;
                //const isCredit = item.type === "Income" || item.type === "Taken" || item.type === "Payment Received";

                return (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{getParticulars(item)}</td>
                    
                    
                    <td>{
                      item.type === "Income" ?  item.amount : "" || item.type === "Loan" ? `₹${item.loanAmount}` : "-" 
                    
                     }
                     </td>

                     <td>{
                           item.type === "Loan" ?  "-" : ""  || item.type === "Income" ?  "-" : ""  ||
                     item.type === "Payment"   ?  `₹${item.amount}` : "-"  || item.type === "Expense" ?  `₹${item.amount}` : "-"
                                 
                    }</td>


                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </div>
    </>
  );
};

export default History;
