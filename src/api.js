export const makePayment = async (paymentData) => {
  try {
    const response = await fetch('/api/payments', { // Adjust the URL if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    // Log the response status and text for debugging
    const responseText = await response.text();
    console.log('Response Status:', response.status);
    console.log('Response Text:', responseText);

    if (!response.ok) {
      throw new Error('Payment failed');
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};
