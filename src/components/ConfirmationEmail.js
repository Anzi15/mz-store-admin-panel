import React from "react";

const ConfirmationEmail = (email, name) => {
  const emailData = {
    toEmail: email,
    subject: `Your Order has been placed, ${name}`,
    textContent: "Your order has been successfully placed.",
    htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #0056b3;
        }
        p {
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Order Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Thank you for your order! We are pleased to inform you that your order has been successfully placed.</p>
        
        <p>Your order will arrive in 3-5 working days. If you have any questions or need further assistance, please do not hesitate to contact us.</p>
        <p>Thank you for shopping with us!</p>
        <p>Best regards,<br>Gm foods achars</p>
        <div class="footer">
            <p>If you did not place this order, please contact our support team immediately.</p>
            <p>MZ Store<br><br>+92 332 3947336<br>info@alzehrabygm.store</p>
        </div>
    </div>
</body>
</html>`,
  };

  // Define the request options
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  };

  // Perform the fetch request
  fetch(
    "https://MZ.netlify.app/.netlify/functions/sendEmail",
    requestOptions
  )
    .then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      return "Success:", data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Error:", error;
    });
};

export default ConfirmationEmail;
