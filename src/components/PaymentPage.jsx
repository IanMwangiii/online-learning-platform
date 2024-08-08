import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentPage = ({ onPaymentSuccess }) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    // Here, you would normally process the payment.
    // For simplicity, let's assume the payment is always successful.
    onPaymentSuccess();
    navigate('/courses');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Payment Page</Typography>
      <TextField
        autoFocus
        margin="dense"
        id="cardNumber"
        label="Card Number"
        type="text"
        fullWidth
        variant="standard"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <TextField
        margin="dense"
        id="expiryDate"
        label="Expiry Date"
        type="text"
        fullWidth
        variant="standard"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <TextField
        margin="dense"
        id="cvv"
        label="CVV"
        type="text"
        fullWidth
        variant="standard"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handlePayment}>
        Make Payment
      </Button>
    </Box>
  );
};

export default PaymentPage;
