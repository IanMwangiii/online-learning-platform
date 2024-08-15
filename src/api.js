// api.js
import axios from 'axios';

export const makePayment = async (paymentData) => {
  try {
    const response = await axios.post('/api/payments', paymentData); // Adjust the URL as needed
    return response.data;
  } catch (error) {
    console.error('Error making payment:', error);
    throw new Error('Payment failed'); // Re-throw the error with a custom message
  }
};


// Function to get course details
export const getCourseDetails = async (courseId) => {
  try {
    const response = await fetch(`/api/courses/${courseId}`); // Adjust the URL if needed
    if (!response.ok) {
      throw new Error('Failed to fetch course details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

// Function to get current user
export const getCurrentUser = async () => {
  try {
    const response = await fetch('/api/users/current'); // Adjust the URL if needed
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
