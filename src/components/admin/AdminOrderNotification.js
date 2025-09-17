import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../modules/firebase-modules/firestore";

const AdminOrderNotification = (orderObj, emails = ["djam4343@gmail.com"]) => {

  const emailData = {
    toEmail: emails,
    subject: `New order has been placed, worth Rs. ${orderObj.grandTotal}`,
    textContent: "There's a new order check it out.",
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
            color: #d9534f;
        }
        p {
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
        .details {
            margin: 20px 0;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Order Notification</h1>
        <p>Dear Admin,</p>
        <p>A new order has been placed on the website. Here are the details:</p>
        <div class="details">
            <p><strong>Order Number:</strong> ${orderObj.orderId}</p>
            <p><strong>Customer Name:</strong> ${orderObj.customer.firstName}</p>
            <p><strong>Order Date:</strong> ${orderObj.createdAt}</p>
            <p><strong>Items Quantity:</strong> ${orderObj.items.length}</p>
        </div>
        <p>Please review the order and take the necessary actions.</p>
        <p>Best regards,<br>Your Company Name</p>
        <div class="footer">
            <p>If you have any questions, please contact our support team.</p>
            <p>Your Company Name<br>Address<br>Phone Number<br>Email Address</p>
        </div>
    </div>
</body>
</html>`
  };
  
  // Define the request options
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData)
  };
  
  fetch('https://alzehrareact.netlify.app/.netlify/functions/sendEmail', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      return ('Success:', data)
    })
    .catch(error => {
      console.error('Error:', error);
      return ('Error:', error);
    });;
};

export default AdminOrderNotification;
