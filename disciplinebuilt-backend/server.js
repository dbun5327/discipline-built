require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

// 2. Stripe Webhook for successful payment (must be before bodyParser.json())
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (endpointSecret) {
      const sig = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      event = req.body;
    }
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    // Send the PDF
    sendPDF(email);
  }

  res.json({ received: true });
});

// Now use bodyParser.json() for all other routes
app.use(bodyParser.json());

// 1. Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'The Chest Workout That Changed Everything',
            description: 'Proven chest workout for natural bodybuilders (PDF download)',
          },
          unit_amount: 1400, // £14.00 in pence
        },
        quantity: 1,
      }],
      customer_email: req.body.email, // prefill email if provided
      allow_promotion_codes: true, // Allow discount codes at checkout
      success_url: 'https://disciplinebuilt.com/success', // Redirect here after successful payment
      cancel_url: 'https://disciplinebuilt.com/cancel',   // Redirect here if payment is cancelled
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Email sending function
function sendPDF(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Discipline Built" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Chest Workout PDF',
    text: 'Thank you for your purchase! Attached is your chest workout PDF.',
    attachments: [
      {
        filename: 'chest-workout.pdf',
        path: process.env.PDF_PATH,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email send error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.listen(4242, () => console.log('Server running on port 4242'));
