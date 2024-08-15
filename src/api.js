const BASE_URL = 'http://localhost:5555'; // Adjust this according to your backend server

export const makePayment = async (paymentData) => {
  if (!paymentData.username || !paymentData.amount || !paymentData.method_of_payment) {
    throw new Error('Missing required payment data fields');
  }

  try {
    const response = await fetch(`${BASE_URL}/api/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Payment failed: ${response.status} ${response.statusText} - ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('Network error or CORS issue:', error.message);
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      console.error('Error making payment:', error.message);
      throw error;
    }
  }
};
