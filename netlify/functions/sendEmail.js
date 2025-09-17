const mailgun = require("mailgun-js");

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey, domain: "mz.store" });

module.exports.handler = async (event) => {
  // Allow CORS from any origin (replace '*' with your frontend domain if needed)
  const headers = {
    "Access-Control-Allow-Origin": "https://alzehrabygm.store", // or 'https://your-frontend-domain.com'
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle OPTIONS method for preflight checks
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "CORS preflight check",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Only POST requests are allowed." }),
    };
  }

  // Parse the request body
  const { toEmail, subject, textContent, htmlContent } = JSON.parse(event.body);

  const emailData = {
    from: "Gm foods achars <noreply@alzehrabygm.store>",
    to: toEmail,
    subject: subject,
    text: textContent,
    html: htmlContent,
  };

  try {
    // Send the email via Mailgun
    await mg.messages().send(emailData);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: `Failed to send email. Error: ${error.message}`,
      }),
    };
  }
};
