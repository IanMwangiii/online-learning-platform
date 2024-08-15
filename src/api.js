// api.js
export const makePayment = async (paymentData) => {
  try {
      const response = await fetch('http://127.0.0.1:5555/api/payment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
      });
      if (!response.ok) {
          throw new Error('Network response was not ok.');
      }
      return await response.json();
  } catch (error) {
      console.error('Payment error details:', error);
      throw error;
  }
};