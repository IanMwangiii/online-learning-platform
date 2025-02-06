// api.js
export const makePayment = async (paymentData) => {
  try {
      const response = await fetch('https://online-learning-platform-22.onrender.com', {
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
