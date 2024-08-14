import { useState } from 'react';
import { makePayment } from '../api'; // Adjust path as needed

function PaymentPage() {
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

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate input
      if (!paymentData.amount || !paymentData.user_id || !paymentData.course_id) {
        throw new Error("Please fill in all required fields.");
      }

      if (paymentData.method_of_payment === 'Card') {
        if (!paymentData.card_number || !paymentData.expiry_date || !paymentData.cvv) {
          throw new Error("Please provide all card details.");
        }
      } else if (paymentData.method_of_payment === 'Mpesa') {
        if (!paymentData.phone_number || !paymentData.mpesa_reference) {
          throw new Error("Please provide all Mpesa details.");
        }
      }

      await makePayment(paymentData); // Use makePayment here
      alert('Payment successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="payment">
      <h2>Make a Payment</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="text" name="amount" value={paymentData.amount} onChange={handleChange} required />
        </label>
        <label>
          User ID:
          <input type="text" name="user_id" value={paymentData.user_id} onChange={handleChange} required />
        </label>
        <label>
          Course ID:
          <input type="text" name="course_id" value={paymentData.course_id} onChange={handleChange} required />
        </label>
        <label>
          Method of Payment:
          <select name="method_of_payment" value={paymentData.method_of_payment} onChange={handleChange} required>
            <option value="Card">Card</option>
            <option value="Mpesa">Mpesa</option>
            <option value="Cash">Cash</option>
          </select>
        </label>
        {paymentData.method_of_payment === 'Card' && (
          <>
            <label>
              Card Number:
              <input type="text" name="card_number" value={paymentData.card_number} onChange={handleChange} required />
            </label>
            <label>
              Expiry Date:
              <input type="text" name="expiry_date" value={paymentData.expiry_date} onChange={handleChange} required />
            </label>
            <label>
              CVV:
              <input type="text" name="cvv" value={paymentData.cvv} onChange={handleChange} required />
            </label>
          </>
        )}
        {paymentData.method_of_payment === 'Mpesa' && (
          <>
            <label>
              Phone Number:
              <input type="text" name="phone_number" value={paymentData.phone_number} onChange={handleChange} required />
            </label>
            <label>
              Mpesa Reference:
              <input type="text" name="mpesa_reference" value={paymentData.mpesa_reference} onChange={handleChange} required />
            </label>
          </>
        )}
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default PaymentPage;
