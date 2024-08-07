import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePayment = () => {
    // Process payment logic here
    navigate(`/payment/${courseId}`);
    // After payment, redirect to course page or dashboard
    navigate(`/course/${id}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Payment Page</Typography>
      <Typography variant="h6">Course ID: {id}</Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Credit Card Number"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Expiration Date"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="CVV"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
        >
          Make Payment
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
