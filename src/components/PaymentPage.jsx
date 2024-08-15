import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makePayment } from '../api'; // Adjust path as needed

const PaymentPage = ({ onPaymentSuccess }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [paymentData, setPaymentData] = useState({
    user_id: '',
    course_id: '',
    amount: '',
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
    setError(null); // Clear previous errors

    try {
      if (!paymentData.user_id || !paymentData.course_id || !paymentData.amount) {
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

      await makePayment(paymentData);
      onPaymentSuccess(); // Notify parent of success
      alert('Payment successful!');
      navigate(`/course/${paymentData.course_id}`); // Navigate to the course page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Payment Page</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          name="user_id"
          type="text"
          value={paymentData.user_id}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Course ID"
          name="course_id"
          type="text"
          value={paymentData.course_id}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Amount"
          name="amount"
          type="text"
          value={paymentData.amount}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Method of Payment</InputLabel>
          <Select
            name="method_of_payment"
            value={paymentData.method_of_payment}
            onChange={handleChange}
            required
          >
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Mpesa">Mpesa</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </Select>
        </FormControl>

        {paymentData.method_of_payment === 'Card' && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Card Number"
              name="card_number"
              type="text"
              value={paymentData.card_number}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Expiry Date (MM/YY)"
              name="expiry_date"
              type="text"
              value={paymentData.expiry_date}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="CVV"
              name="cvv"
              type="text"
              value={paymentData.cvv}
              onChange={handleChange}
              required
            />
          </Box>
        )}

        {paymentData.method_of_payment === 'Mpesa' && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              name="phone_number"
              type="text"
              value={paymentData.phone_number}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="M-Pesa Reference"
              name="mpesa_reference"
              type="text"
              value={paymentData.mpesa_reference}
              onChange={handleChange}
              required
            />
          </Box>
        )}

        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} type="submit">
          Pay
        </Button>
      </form>
    </Box>
  );
};

// Add prop validation
PaymentPage.propTypes = {
  onPaymentSuccess: PropTypes.func.isRequired
};

export default PaymentPage;
