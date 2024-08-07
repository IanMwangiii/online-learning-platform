// src/pages/PaymentPage.jsx
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const PaymentPage = () => {
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
      />
      <TextField
        margin="dense"
        id="expiryDate"
        label="Expiry Date"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        id="cvv"
        label="CVV"
        type="text"
        fullWidth
        variant="standard"
      />
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Make Payment</Button>
    </Box>
  );
};

export default PaymentPage;
