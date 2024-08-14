import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { makePayment, getCourseDetails, getCurrentUser } from '../api'; // Adjust path as needed

const PaymentPage = ({ onPaymentSuccess }) => {
  const { courseId } = useParams(); // Get courseId from URL
  const [paymentData, setPaymentData] = useState({
    amount: '',
    username: '',
    method_of_payment: '',
    card_number: '',
    expiry_date: '',
    cvv: '',
    phone_number: '',
    mpesa_reference: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch course details and current user information
    const fetchData = async () => {
      try {
        const [courseDetails, user] = await Promise.all([
          getCourseDetails(courseId),
          getCurrentUser()
        ]);
        setPaymentData(prevData => ({
          ...prevData,
          amount: courseDetails.price, // Set course price as amount
          username: user.username // Set current username
        }));
      } catch (err) {
        setError('Failed to load course details or user information.');
      }
    };

    fetchData();
  }, [courseId]);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    try {
      if (!paymentData.amount || !paymentData.username) {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Payment Page</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {loading && <Typography>Processing payment...</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Amount"
          name="amount"
          type="text"
          value={paymentData.amount}
          readOnly
        />
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          type="text"
          value={paymentData.username}
          readOnly
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

export default PaymentPage;
