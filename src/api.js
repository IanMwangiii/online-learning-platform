const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

export const makePayment = async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to make payment:', error);
      return null;
    }
  };