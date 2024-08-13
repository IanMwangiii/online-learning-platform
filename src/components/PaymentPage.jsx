import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import Notification from './Notification';

const PaymentPage = ({ onPaymentSuccess, courseId }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://127.0.0.1:5555/payments', 
        { method: paymentMethod, courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        onPaymentSuccess(); // Adjust as needed based on your flow
        navigate('/courses'); // Redirect or adjust based on your flow
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <FormControl fullWidth>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value="card">Credit/Debit Card</MenuItem>
          <MenuItem value="mpesa">M-Pesa</MenuItem>
        </Select>
      </FormControl>
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
