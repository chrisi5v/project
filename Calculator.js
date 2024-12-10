import React, { useState } from "react";
import "./style.css";

const Calculator = () => {
  const [emolument, setEmolument] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [tax, setTax] = useState(null);
  const [error, setError] = useState("");

  const calculateTax = () => {
    let yearlyEmol = 0;
    let incomeTax = 0;

    const TAX_CREDIT_BASE = 2250.0;
    const LOWER_LIMIT = 29000.0;
    const UPPER_LIMIT = 32000.0;
    const ITAX_RELIEF = 20000.0;
    const TAX_CREDIT_THRESHOLD = 29000.0;

    try {
      const emolValue = parseFloat(emolument);

      if (isNaN(emolValue) || emolValue <= 0) {
        setError("Please enter a valid positive number for emoluments.");
        return;
      }

      if (frequency === "Monthly") {
        yearlyEmol = emolValue * 12;
      } else if (frequency === "Yearly") {
        yearlyEmol = emolValue;
      } else {
        setError("Please select a valid frequency (Monthly or Yearly).");
        return;
      }

      let taxCredit = TAX_CREDIT_BASE - (yearlyEmol - TAX_CREDIT_THRESHOLD) * 0.75;

      if (yearlyEmol <= LOWER_LIMIT) {
        incomeTax = 0;
      } else if (yearlyEmol > LOWER_LIMIT && yearlyEmol <= UPPER_LIMIT) {
        incomeTax = (yearlyEmol - ITAX_RELIEF) * 0.25 - taxCredit;
      } else {
        incomeTax = (yearlyEmol - ITAX_RELIEF) * 0.25;
      }

      if (frequency === "Monthly") {
        incomeTax /= 12;
      }

      setTax(incomeTax.toFixed(2));
      setError("");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Income Tax Calculator</h1>
      <div className="form-group">
        <label htmlFor="emolument">Total Emoluments:</label>
        <input
          type="number"
          id="emolument"
          value={emolument}
          onChange={(e) => setEmolument(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div className="form-group">
        <label htmlFor="frequency">Payment Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="Yearly">Yearly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <button onClick={calculateTax} className="btn">
        Calculate Tax
      </button>
      {error && <p className="error">{error}</p>}
      {tax !== null && (
        <p className="result">Calculated Tax: <strong>${tax}</strong></p>
      )}
    </div>
  );
};

export default Calculator;
