import { useState } from "react";
import "./styles.css";
import { toINR } from "../helpers/toINR";

const Calculator = ({ idx }) => {
  const [formData, setFormData] = useState({
    rate: 0,
    weight: 0,
    makingChargesInPercentage: 0,
    metalPrice: 0,
    gst: 0,
    totalWastage: 0,
    totalBillingAmount: 0,
    makingChargesInRupee: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const resetFormData = {
      metalPrice: 0,
      gst: 0,
      makingChargesInRupee: 0,
      totalWastage: 0,
      totalBillingAmount: 0,
    };

    setFormData({ ...formData, ...resetFormData, [name]: value });
  };

  const handleCalculation = () => {
    const metalPrice = Math.round(formData.rate * formData.weight);
    const makingChargesInRupee = Math.round(
      metalPrice * (formData.makingChargesInPercentage / 100)
    );
    const gst = Math.round((metalPrice + makingChargesInRupee) * 0.03);

    const nextFormData = {
      ...formData,
      metalPrice,
      gst,
      makingChargesInRupee,
      totalWastage: Math.round(makingChargesInRupee + gst),
      totalBillingAmount: Math.round(metalPrice + makingChargesInRupee + gst),
    };

    setFormData(nextFormData);
  };

  return (
    <div className="calculator">
      <form>
        <legend className="legend">Calculator #{idx + 1}</legend>
        <div className="form-control">
          <label>Rate (of 1gm):</label>
          <input
            type="number"
            name="rate"
            onChange={handleInputChange}
            min={5000}
            max={10000}
          />
        </div>
        <div className="form-control">
          <label>Weight (in gm):</label>
          <input
            type="number"
            name="weight"
            onChange={handleInputChange}
            min={0.1}
            max={100}
          />
        </div>
        <div className="form-control">
          <label>Making charges (in %):</label>
          <input
            type="number"
            name="makingChargesInPercentage"
            onChange={handleInputChange}
            min={1}
            max={25}
          />
        </div>
        <div className="form-control">
          <button type="button" onClick={handleCalculation}>
            Calculate
          </button>
        </div>
      </form>
      <div className="result">
        <span>Metal Price: {toINR(formData.metalPrice)}</span>
        <span>Making Charges: {toINR(formData.makingChargesInRupee)}</span>
        <span>GST: {toINR(formData.gst)}</span>
        <span>Total Wastage: {toINR(formData.totalWastage)}</span>
        <span>
          Total Billing Amount:{" "}
          <strong>{toINR(formData.totalBillingAmount)}</strong>
        </span>
      </div>
    </div>
  );
};

export default Calculator;
