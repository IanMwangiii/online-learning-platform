// api.js
export const makePayment = async (paymentData) => {
  const response = await fetch('http://127.0.0.1:5555/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to process payment.');
  }
};
