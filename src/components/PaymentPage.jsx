import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography } from '@mui/material';
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
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  // Fetch course details if courseId is provided
  useEffect(() => {
    if (!courseId) {
      setError('Course ID is missing.');
      return;
    }

    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:5555/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        setError('Error fetching course data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

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

      // Submit payment details
      const response = await axios.post('http://127.0.0.1:5555/payments', {
        amount: course?.price || 100, // Adjust the amount based on course data
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
      setError(err.response?.data?.message || err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Payment Page
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Notification severity="error" message={error} />}
          {course && (
            <Typography variant="h6" gutterBottom>
              {course.name} - ${course.price}
            </Typography>
          )}

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
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Make Payment'}
          </Button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
