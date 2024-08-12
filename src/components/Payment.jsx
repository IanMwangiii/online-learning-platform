import { useState } from 'react';
import { makePayment } from '../api'; // Add makePayment function in api.js
import './App.css';

function Payment() {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    user_id: '',
    course_id: '',
    method_of_payment: '',
    card_number: '',
    expiry_date: '',
    cvv: '',
    phone_number: '',
    mpesa_reference: ''
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await makePayment(paymentData);
    alert('Payment successful!');
  };

  return (
    <div className="payment">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="text" name="amount" value={paymentData.amount} onChange={handleChange} />
        </label>
        <label>
          User ID:
          <input type="text" name="user_id" value={paymentData.user_id} onChange={handleChange} />
        </label>
        <label>
          Course ID:
          <input type="text" name="course_id" value={paymentData.course_id} onChange={handleChange} />
        </label>
        <label>
          Method of Payment:
          <select name="method_of_payment" value={paymentData.method_of_payment} onChange={handleChange}>
            <option value="Card">Card</option>
            <option value="Mpesa">Mpesa</option>
            <option value="Cash">Cash</option>
          </select>
        </label>
        {paymentData.method_of_payment === 'Card' && (
          <>
            <label>
              Card Number:
              <input type="text" name="card_number" value={paymentData.card_number} onChange={handleChange} />
            </label>
            <label>
              Expiry Date:
              <input type="text" name="expiry_date" value={paymentData.expiry_date} onChange={handleChange} />
            </label>
            <label>
              CVV:
              <input type="text" name="cvv" value={paymentData.cvv} onChange={handleChange} />
            </label>
          </>
        )}
        {paymentData.method_of_payment === 'Mpesa' && (
          <>
            <label>
              Phone Number:
              <input type="text" name="phone_number" value={paymentData.phone_number} onChange={handleChange} />
            </label>
            <label>
              Mpesa Reference:
              <input type="text" name="mpesa_reference" value={paymentData.mpesa_reference} onChange={handleChange} />
            </label>
          </>
        )}
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default Payment;