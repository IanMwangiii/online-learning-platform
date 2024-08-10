import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentPage = ({ onPaymentSuccess }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [courseId, setCourseId] = useState(1); // Assume courseId is passed or set dynamically

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);
  const validateExpiryDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  const validateCvv = (cvv) => /^[0-9]{3}$/.test(cvv);
  const validateMpesaNumber = (number) => /^[0-9]{10}$/.test(number);

  const handlePayment = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!validateCardNumber(cardNumber)) newErrors.cardNumber = 'Invalid card number';
      if (!validateExpiryDate(expiryDate)) newErrors.expiryDate = 'Invalid expiry date';
      if (!validateCvv(cvv)) newErrors.cvv = 'Invalid CVV';
    } else if (paymentMethod === 'mpesa') {
      if (!validateMpesaNumber(mpesaNumber)) newErrors.mpesaNumber = 'Invalid M-Pesa number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (typeof onPaymentSuccess === 'function') {
      onPaymentSuccess(courseId);
    }

    navigate(`/course/${courseId}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Payment Page</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Payment Method</FormLabel>
        <RadioGroup
          aria-label="payment-method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="card" control={<Radio />} label="Pay with Card" />
          <FormControlLabel value="mpesa" control={<Radio />} label="Pay with M-Pesa" />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'card' && (
        <Box sx={{ mt: 2 }}>
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
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
          />
          <TextField
            margin="dense"
            id="expiryDate"
            label="Expiry Date (MM/YY)"
            type="text"
            fullWidth
            variant="standard"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
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
            error={!!errors.cvv}
            helperText={errors.cvv}
          />
        </Box>
      )}

      {paymentMethod === 'mpesa' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            id="mpesaNumber"
            label="M-Pesa Number"
            type="text"
            fullWidth
            variant="standard"
            value={mpesaNumber}
            onChange={(e) => setMpesaNumber(e.target.value)}
            error={!!errors.mpesaNumber}
            helperText={errors.mpesaNumber}
          />
        </Box>
      )}

      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handlePayment}>
        Make Payment
      </Button>
    </Box>
  );
};

export default PaymentPage;
