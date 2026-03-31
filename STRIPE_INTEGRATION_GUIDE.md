# 🚀 Stripe Payment Integration - Complete Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Features Implemented](#features-implemented)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Running the Application](#running-the-application)
8. [Testing Stripe Integration](#testing-stripe-integration)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This is a **production-ready Stripe payment integration** for Kemboja Juara Travels booking system. The system handles:

✅ Secure payment processing via Stripe Checkout  
✅ Automatic booking confirmation emails with QR codes  
✅ Webhook-based payment verification  
✅ PostgreSQL database storage  
✅ Company notification emails  
✅ Success/failure handling  

---

## Features Implemented

### 1. ✅ UI Updates
- Renamed "Estimated Payment Rate" → **"Payment"** throughout the application
- Modern success and cancel pages with professional design

### 2. ✅ Stripe Checkout Integration
- Replaces WhatsApp redirect with secure Stripe payment
- Creates checkout session with calculated payment amount
- Supports both card and FPX (Malaysian online banking) payments

### 3. ✅ Metadata Tracking
All booking details passed to Stripe:
- `package_name` - Selected tour package
- `transportation_type` - Vehicle type
- `travel_date` - Tour date
- `travel_time` - Tour time
- `pax_count` - Number of people
- Plus: customer info, route, days, water sports activities, etc.

### 4. ✅ Webhook Handler
- Listens for `checkout.session.completed` events
- Verifies webhook signatures for security
- Processes payments automatically

### 5. ✅ Database Integration
- PostgreSQL schema with indexed fields
- Automatic booking reference generation (e.g., KJ1ABC2XYZ3)
- Stores all booking and payment details

### 6. ✅ Email System with QR Codes
**Customer Email:**
- Professional HTML template
- QR code with booking details
- Contact information
- Next steps instructions

**Company Email:**
- Detailed booking information
- Payment confirmation
- Action items checklist

### 7. ✅ Success/Failure Handling
- `/success.html` - Payment successful with contact info
- `/cancel.html` - Payment cancelled with retry option

---

## Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- ✅ **Stripe Account** - [Sign up](https://dashboard.stripe.com/register)
- ✅ **Gmail Account** (for sending emails)
- ✅ **Code Editor** (VS Code recommended)

---

## Installation & Setup

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd "travel-website"

# Install Node.js packages
npm install express stripe cors dotenv nodemailer qrcode pg
npm install --save-dev nodemon
```

### Step 2: Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (pk_test_...)
3. Copy your **Secret key** (sk_test_...)
4. Keep these safe - you'll need them for .env file

### Step 3: Set Up Webhook

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhook`
4. Select event: `checkout.session.completed`
5. Copy the **Signing secret** (whsec_...)

---

## Environment Variables

### Step 1: Create .env File

Create a file named `.env` in the `travel-website` folder (copy from `env-template.txt`):

```env
# STRIPE CONFIGURATION
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# DATABASE (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/kemboja_bookings

# EMAIL (Gmail)
EMAIL_USER=youremail@gmail.com
EMAIL_PASSWORD=your_app_specific_password
COMPANY_EMAIL=kembojajuaratravels@gmail.com

# APPLICATION
NODE_ENV=development
PORT=3001
DOMAIN_URL=http://localhost:3001
```

### Step 2: Gmail App Password

**Important:** Don't use your regular Gmail password!

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Create a new app password for "Mail"
5. Copy the 16-character password
6. Use this as `EMAIL_PASSWORD` in .env

---

## Database Setup

### Step 1: Install PostgreSQL

Download and install PostgreSQL from [official website](https://www.postgresql.org/download/).

### Step 2: Create Database

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE kemboja_bookings;

-- Connect to the database
\c kemboja_bookings

-- The tables will be created automatically when you start the server
-- (see server-stripe.js createDatabaseSchema function)
```

### Database Schema

The application automatically creates this table:

```sql
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_payment_intent VARCHAR(255),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    nationality VARCHAR(100),
    pax_count INTEGER NOT NULL,
    package_name VARCHAR(255) NOT NULL,
    transportation_type VARCHAR(100),
    airport_route VARCHAR(255),
    tour_days VARCHAR(50),
    travel_date DATE,
    travel_time TIME,
    description TEXT,
    water_sports_activities TEXT,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_currency VARCHAR(10) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Running the Application

### Development Mode

```bash
# Start the server with auto-reload
npm run dev

# Or manually:
node server-stripe.js
```

You should see:
```
🚀 Server running on port 3001
💳 Stripe integration active
🔔 Webhook endpoint: /api/webhook
✅ Database schema created/verified
```

### Access the Application

- **Main Site**: http://localhost:3001/index.html
- **Success Page**: http://localhost:3001/success.html
- **Cancel Page**: http://localhost:3001/cancel.html

---

## Testing Stripe Integration

### Local Testing with Stripe CLI

1. **Install Stripe CLI**: [Download](https://stripe.com/docs/stripe-cli)

2. **Login to Stripe**:
```bash
stripe login
```

3. **Forward Webhooks to Local Server**:
```bash
stripe listen --forward-to localhost:3001/api/webhook
```

This will give you a webhook signing secret (whsec_...) - use this in your .env file.

### Test Cards

Use these test card numbers (any future expiry date, any CVC):

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 9995 | ❌ Declined |
| 4000 0025 0000 3155 | ⏳ Requires authentication |

### Testing Flow

1. **Fill Booking Form**:
   - Enter test customer details
   - Select a package
   - Choose transportation
   - Verify payment amount appears

2. **Submit Form**:
   - Click "Submit Booking"
   - Should redirect to Stripe Checkout

3. **Complete Payment**:
   - Use test card: 4242 4242 4242 4242
   - Complete the payment

4. **Verify Success**:
   - Redirected to `/success.html`
   - Check console for webhook logs
   - Check database for new booking
   - Check email for confirmation with QR code

---

## Deployment Guide

### Option 1: Deploy to Heroku

1. **Create Heroku App**:
```bash
heroku create kemboja-travels
```

2. **Add PostgreSQL**:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. **Set Environment Variables**:
```bash
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_...
heroku config:set EMAIL_USER=youremail@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_password
heroku config:set COMPANY_EMAIL=kembojajuaratravels@gmail.com
heroku config:set NODE_ENV=production
heroku config:set DOMAIN_URL=https://kemboja-travels.herokuapp.com
```

4. **Deploy**:
```bash
git add .
git commit -m "Add Stripe integration"
git push heroku main
```

5. **Configure Stripe Webhook**:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://kemboja-travels.herokuapp.com/api/webhook`
   - Select event: `checkout.session.completed`

### Option 2: Deploy to Vercel/Netlify

For Vercel/Netlify, you'll need to adjust the server-stripe.js to use serverless functions.

---

## API Endpoints

### 1. Create Checkout Session

**POST** `/api/create-checkout-session`

Creates a Stripe Checkout session for payment.

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+60123456789",
  "nationality": "Malaysian",
  "people": "2",
  "travelDate": "2026-03-15",
  "travelTime": "09:00",
  "tourType": "Package A",
  "transportation": "car",
  "paymentAmount": "RM 299",
  "description": "Optional notes"
}
```

**Response**:
```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/..."
}
```

### 2. Webhook Handler

**POST** `/api/webhook`

Receives Stripe webhook events. Signature verification required.

**Handles**: `checkout.session.completed`

**Actions**:
1. Save booking to database
2. Generate QR code
3. Send customer confirmation email
4. Send company notification email

---

## Project Structure

```
travel-website/
├── index.html                      # Main booking form
├── success.html                    # Payment success page
├── cancel.html                     # Payment cancelled page
├── script.js                       # Frontend JavaScript
├── styles.css                      # Styles
├── server-stripe.js               # Main server with Stripe integration
├── package-stripe.json            # Dependencies
├── env-template.txt               # Environment variables template
└── STRIPE_INTEGRATION_GUIDE.md    # This file
```

---

## Payment Flow Diagram

```
┌─────────────┐
│   Customer  │
│  Fills Form │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Submit Booking     │
│  (Frontend)         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Create Stripe       │
│ Checkout Session    │
│ (Backend API)       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Redirect to         │
│ Stripe Checkout     │
│ (Secure Payment)    │
└──────┬──────────────┘
       │
       ├───────────────┐
       │               │
       ▼               ▼
┌──────────┐    ┌──────────┐
│ SUCCESS  │    │  CANCEL  │
└──────┬───┘    └────────┘
       │
       ▼
┌─────────────────────┐
│ Stripe Webhook      │
│ checkout.session.   │
│ completed           │
└──────┬──────────────┘
       │
       ├─────────────┬──────────────┬──────────────┐
       │             │              │              │
       ▼             ▼              ▼              ▼
┌──────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
│   Save   │  │  Generate │  │   Send    │  │   Send    │
│ Database │  │  QR Code  │  │ Customer  │  │  Company  │
│          │  │           │  │   Email   │  │   Email   │
└──────────┘  └───────────┘  └───────────┘  └───────────┘
```

---

## Troubleshooting

### Issue 1: Stripe Checkout Not Opening

**Symptoms**: Form submits but nothing happens

**Solutions**:
- Check browser console for errors
- Verify `.env` file has correct `STRIPE_SECRET_KEY`
- Check server is running on correct port
- Ensure `DOMAIN_URL` in .env matches your actual URL

### Issue 2: Webhook Not Receiving Events

**Symptoms**: Payment succeeds but no email/database entry

**Solutions**:
- Check webhook endpoint in Stripe Dashboard
- Verify `STRIPE_WEBHOOK_SECRET` in .env
- Check server logs for webhook errors
- Use Stripe CLI to test webhooks locally:
  ```bash
       stripe listen --forward-to localhost:3001/api/webhook
  ```

### Issue 3: Database Connection Failed

**Symptoms**: Error "Cannot connect to database"

**Solutions**:
- Verify PostgreSQL is running
- Check `DATABASE_URL` format in .env
- Test connection:
  ```bash
  psql -U username -d kemboja_bookings
  ```
- Ensure database exists

### Issue 4: Emails Not Sending

**Symptoms**: Booking saved but no email received

**Solutions**:
- Check `EMAIL_USER` and `EMAIL_PASSWORD` in .env
- Use Gmail App-Specific Password (not regular password)
- Enable "Less secure app access" if needed
- Check spam folder
- Verify email in server logs

### Issue 5: QR Code Not Showing

**Symptoms**: Email received but QR code missing

**Solutions**:
- Check `qrcode` package is installed
- Verify HTML email rendering (some clients block images)
- Check console logs for QR generation errors

---

## Security Best Practices

### ✅ Implemented

1. **Webhook Signature Verification** - Validates all webhook requests
2. **Environment Variables** - Sensitive data not in code
3. **Input Validation** - Validates all form inputs
4. **SQL Injection Prevention** - Using parameterized queries
5. **HTTPS Required** - For production (enforced by Stripe)

### 🔒 Additional Recommendations

1. **Rate Limiting**: Add rate limiting to prevent abuse
2. **CORS Configuration**: Restrict CORS in production
3. **Logging**: Implement proper logging system
4. **Monitoring**: Set up alerts for failed payments
5. **Backup**: Regular database backups

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Check server logs for errors
- [ ] Verify webhooks are being received
- [ ] Check email sending success rate
- [ ] Monitor payment success rate

### Weekly Tasks
- [ ] Review failed payments in Stripe Dashboard
- [ ] Check database backup status
- [ ] Review and respond to customer issues
- [ ] Update package prices if needed

### Monthly Tasks
- [ ] Review Stripe transaction fees
- [ ] Analyze booking patterns
- [ ] Update documentation if needed
- [ ] Security audit

---

## Support & Resources

### Official Documentation
- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Node.js Stripe Library](https://github.com/stripe/stripe-node)

### Contact
- **Email**: kembojajuaratravels@gmail.com
- **Phone**: +60196533699
- **Business Hours**: Monday - Sunday, 9:00 AM - 6:00 PM

---

## Changelog

### Version 1.0.0 (February 5, 2026)
- ✅ Initial Stripe integration
- ✅ Webhook handler implementation
- ✅ Database schema creation
- ✅ Email system with QR codes
- ✅ Success/cancel pages
- ✅ Complete documentation

---

## License

Copyright © 2026 Kemboja Juara Travels. All rights reserved.

---

**Status**: ✅ Production Ready  
**Last Updated**: February 5, 2026  
**Version**: 1.0.0
