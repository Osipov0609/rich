import { useState } from 'react';
import './css/Card.css';

export default function Card() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    holderName: "",
    expiryDate: "",
    cvv: ""
  });

 
  const handleCardNumber = (value) => {
    let v = value.replace(/\D/g, "").slice(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

 
  const handleExpiry = (value) => {
    let v = value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") formattedValue = handleCardNumber(value);
    if (name === "expiryDate") formattedValue = handleExpiry(value);
    if (name === "cvv") formattedValue = value.replace(/\D/g, "").slice(0, 3);
    if (name === "holderName") formattedValue = value.replace(/[^a-zA-Z\s]/g, ""); 

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSend = () => {
    console.log("Վճարման տվյալներ:", formData);
    alert("Payment Processing...");
  };

 
  const isFormValid = 
    formData.cardNumber.length === 19 && 
    formData.expiryDate.length === 5 && 
    formData.cvv.length === 3 && 
    formData.holderName.length > 2;

  return (
    <div className='card-component'>
      <div className="card-box">
        <h3>Bank Card Details</h3>
        
        <div className="input-group">
          <label>Card Holder Name</label>
          <input 
            type="text" 
            name="holderName"
            placeholder="JOHN DOE"
            value={formData.holderName}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Card Number</label>
          <input 
            type="text" 
            name="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={formData.cardNumber}
            onChange={handleChange}
          />
        </div>

        <div className="card-row">
          <div className="input-group">
            <label>Expiry Date</label>
            <input 
              type="text" 
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>CVV</label>
            <input 
              type="password" 
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
            />
          </div>
        </div>

        <button 
          className="send-btn" 
          onClick={handleSend} 
          disabled={!isFormValid}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}