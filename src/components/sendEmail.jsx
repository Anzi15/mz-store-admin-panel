const handleSendEmail = async () => {
    const emailData = {
      toEmail: 'customer@example.com',
      subject: 'Order Confirmation',
      textContent: 'Thank you for your purchase!',
      htmlContent: '<h1>Order Confirmation</h1><p>Thank you for your purchase!</p>',
    };
  
    try {
      const response = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      const result = await response.json();
      console.log('Response from server:', result.message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  