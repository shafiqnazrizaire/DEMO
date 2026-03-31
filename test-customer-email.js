#!/usr/bin/env node
/**
 * Test script: send one customer confirmation email to nazeemronney@gmail.com
 * Uses same template as server-stripe.js (hosted logo, styling).
 * Run: node test-customer-email.js
 * Requires: .env with EMAIL_USER, EMAIL_PASSWORD (or EMAIL_PASS)
 */
require('dotenv').config();
const nodemailer = require('nodemailer');

const TEST_TO = 'nazeemronney@gmail.com';
const LOGO_URL = process.env.CUSTOMER_EMAIL_LOGO_URL || 'https://kembojajuara.com/LatestKembojaLogo.png';
const BOOKING_REF = 'KJTEST' + Date.now().toString(36).toUpperCase();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS,
    },
});

const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 24px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 28px 24px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0 0 8px 0; font-size: 1.75rem; }
        .header p { margin: 0; font-size: 1rem; opacity: 0.95; }
        .logo-wrap { background: #fff; text-align: center; padding: 24px 24px 20px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
        .logo-wrap img { display: block; width: 140px; max-width: 100%; height: auto; margin: 0 auto; }
        .content { background: #f9fafb; padding: 28px 24px; border: 1px solid #e5e7eb; border-top: none; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .booking-details h3 { margin: 0 0 16px 0; font-size: 1.1rem; color: #374151; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: 600; color: #6b7280; flex-shrink: 0; margin-right: 12px; }
        .detail-value { color: #1f2937; text-align: right; }
        .footer { background: #1f2937; color: white; padding: 20px 24px; text-align: center; border-radius: 0 0 10px 10px; font-size: 0.9rem; }
        .footer p { margin: 6px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Booking Confirmed</h1>
            <p>Thank you for choosing Kemboja Juara Travels</p>
        </div>
        <div class="logo-wrap">
            <img src="${LOGO_URL}" alt="Kemboja Juara Travels" width="140" style="display:block; width:140px; max-width:100%; height:auto; margin:0 auto;" />
        </div>
        <div class="content">
            <p>Dear Test User,</p>
            <p>Your booking has been confirmed and <strong>payment has been received successfully.</strong></p>
            <div class="booking-details">
                <h3>Booking Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Booking Reference:</span>
                    <span class="detail-value"><strong>${BOOKING_REF}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Package:</span>
                    <span class="detail-value">Package A</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Travel Date:</span>
                    <span class="detail-value">2025-03-01 at 09:00</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Number of People:</span>
                    <span class="detail-value">2 person(s)</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Transportation:</span>
                    <span class="detail-value">Car</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount Paid:</span>
                    <span class="detail-value"><strong>RM 299.00</strong></span>
                </div>
            </div>
            <div class="booking-details">
                <h3>What's Next?</h3>
                <p>• Our team will contact you within 24 hours to confirm final details.</p>
                <p>• Please arrive 15 minutes before your scheduled time.</p>
                <p>• Bring a valid ID and this confirmation email.</p>
            </div>
            <div style="text-align: center; margin: 20px 0;">
                <p><strong>Need immediate assistance?</strong></p>
                <p>Call/WhatsApp: <a href="tel:+60196533699" style="color: #3b82f6;">+60196533699</a></p>
                <p>Email: <a href="mailto:kembojajuaratravels@gmail.com" style="color: #3b82f6;">kembojajuaratravels@gmail.com</a></p>
            </div>
        </div>
        <div class="footer">
            <p><strong>Kemboja Juara Travels</strong></p>
            <p>18, Jalan Batu Ferringhi, 11100 Batu Ferringhi, Pulau Pinang</p>
        </div>
    </div>
</body>
</html>
`;

async function run() {
    if (!process.env.EMAIL_USER || (!process.env.EMAIL_PASSWORD && !process.env.EMAIL_PASS)) {
        console.error('Missing .env: set EMAIL_USER and EMAIL_PASSWORD (or EMAIL_PASS)');
        process.exit(1);
    }
    console.log('Sending customer confirmation test to:', TEST_TO);
    await transporter.sendMail({
        from: `"Kemboja Juara Travels" <${process.env.EMAIL_USER}>`,
        to: TEST_TO,
        subject: `Booking Confirmation - ${BOOKING_REF}`,
        html,
    });
    console.log('Done. Check inbox (and spam) at', TEST_TO);
}

run().catch((err) => {
    console.error('Send failed:', err.message);
    process.exit(1);
});
