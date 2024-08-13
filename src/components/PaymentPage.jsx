import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import Notification from './Notification';

const PaymentPage = ({ onPaymentSuccess, courseId }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mpesaReference, setMpesaReference] = useState('');
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate payment details
      if (paymentMethod === 'credit_card') {
        if (!cardNumber || !expiryDate || !cvv) {
          throw new Error('Credit card details are required.');
        }
      } else if (paymentMethod === 'mpesa') {
        if (!mpesaReference) {
          throw new Error('M-Pesa reference is required.');
        }
      }

      const response = await axios.post('http://127.0.0.1:5555/payments', {
        amount: 100, // Adjust the amount as necessary
        user_id: 1,  // Replace with actual user ID
        course_id: courseId,
        method_of_payment: paymentMethod,
        card_number: paymentMethod === 'credit_card' ? cardNumber : undefined,
        expiry_date: paymentMethod === 'credit_card' ? expiryDate : undefined,
        cvv: paymentMethod === 'credit_card' ? cvv : undefined,
        phone_number: paymentMethod === 'mpesa' ? phoneNumber : undefined,
        mpesa_reference: paymentMethod === 'mpesa' ? mpesaReference : undefined
      });

      if (response.status === 200) {
        onPaymentSuccess(courseId);  // Notify success and pass course ID
        navigate('/courses');  // Redirect to courses page or wherever needed
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value="credit_card">Credit/Debit Card</MenuItem>
          <MenuItem value="mpesa">M-Pesa</MenuItem>
        </Select>
      </FormControl>
      {paymentMethod === 'credit_card' && (
        <>
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiry Date (MM/YYYY)"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            fullWidth
            margin="normal"
          />
        </>
      )}
      {paymentMethod === 'mpesa' && (
        <>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="M-Pesa Reference"
            value={mpesaReference}
            onChange={(e) => setMpesaReference(e.target.value)}
            fullWidth
            margin="normal"
          />
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Pay'}
      </Button>
      {error && <Notification message={error} severity="error" />}
    </div>
  );
};

export default PaymentPage;
