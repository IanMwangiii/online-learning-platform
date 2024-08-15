import axios from 'axios';

const API_URL = 'http://127.0.0.1:5555'; // Your Flask API URL

export const getCourse = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // If using JWT
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const makePayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};
