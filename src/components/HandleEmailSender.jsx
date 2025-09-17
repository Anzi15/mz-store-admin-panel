const handleSendEmail = async () => {
    // Email data from the frontend (after form submission or purchase)
    const emailData = {
      toEmail: 'customer@example.com', // Recipient email
      subject: 'Order Confirmation', // Email subject
      textContent: 'Thank you for your purchase!', // Plain text body
      htmlContent: '<h1>Order Confirmation</h1><p>Thank you for your purchase!</p>', // HTML body (optional)
    };
  
    try {
      // Send POST request to Firebase function with email data
      const response = await fetch('https://<your-firebase-function-url>/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      const result = await response.text();
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  